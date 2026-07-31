<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
  exit;
}

// --- Load config from environment (set these in your server / .env, never hardcode) ---
$smtpHost = getenv('SMTP_HOST') ?: '';
$smtpUser = getenv('SMTP_USER') ?: '';
$smtpPass = getenv('SMTP_PASS') ?: '';
$smtpPort = getenv('SMTP_PORT') ?: 587;
$fromEmail = getenv('MAIL_FROM') ?: $smtpUser;
$toEmail = getenv('MAIL_TO') ?: '';   // <-- your inbox goes here via env, not in code

if (!$smtpHost || !$smtpUser || !$smtpPass || !$toEmail) {
  http_response_code(500);
  echo json_encode(['status' => 'error', 'message' => 'Server mail configuration is missing.']);
  exit;
}

// --- Honeypot spam check (add a hidden input named "website" to your HTML form) ---
if (!empty($_POST['website'])) {
  // Bots fill hidden fields; silently pretend success so they move on.
  echo json_encode(['status' => 'success', 'message' => 'Your message has been sent successfully!']);
  exit;
}

// --- Input validation ---
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

if (!$name || !$email || !$subject || !$message) {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'Invalid or incomplete form data.']);
  exit;
}

// Basic length guards to stop abuse
if (mb_strlen($name) > 100 || mb_strlen($subject) > 200 || mb_strlen($message) > 5000) {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'One or more fields exceed the allowed length.']);
  exit;
}

$mail = new PHPMailer(true);

try {
  // SMTP Configuration
  $mail->isSMTP();
  $mail->Host = $smtpHost;
  $mail->SMTPAuth = true;
  $mail->Username = $smtpUser;
  $mail->Password = $smtpPass;
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port = (int) $smtpPort;

  // Recipients
  $mail->setFrom($fromEmail, 'Portfolio Contact Form');
  $mail->addAddress($toEmail);
  $mail->addReplyTo($email, $name);

  // Content
  $mail->isHTML(true);
  $mail->Subject = "Portfolio Contact: {$subject}";
  $mail->Body = "<p><strong>Name:</strong> {$name}</p>"
    . "<p><strong>Email:</strong> {$email}</p>"
    . "<p><strong>Message:</strong><br>" . nl2br($message) . "</p>";
  $mail->AltBody = "Name: {$name}\nEmail: {$email}\n\nMessage:\n{$message}";

  $mail->send();
  echo json_encode(['status' => 'success', 'message' => 'Your message has been sent successfully!']);
} catch (Exception $e) {
  error_log('Contact form mail error: ' . $mail->ErrorInfo);
  http_response_code(500);
  echo json_encode(['status' => 'error', 'message' => 'Message could not be sent. Please try again later.']);
}