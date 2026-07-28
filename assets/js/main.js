/**
* Main Application JavaScript
* Modernized Object-Oriented Architecture
*/

// Disable browser's auto scroll restoration on reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    // 1. Immediately apply root theme attribute to prevent light/dark flash
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    
    // 2. Initial icon sync
    this.updateIcon();

    // 3. Event Delegation: Catch clicks on .theme-toggle-btn even if injected later
    document.addEventListener('click', (event) => {
      const toggleBtn = event.target.closest('.theme-toggle-btn');
      if (toggleBtn) {
        this.toggleTheme();
      }
    });
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
    this.updateIcon();
  }

  updateIcon() {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    
    toggleBtns.forEach((btn) => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (this.currentTheme === 'dark') {
          icon.className = 'bi bi-sun-fill theme-icon';
        } else {
          icon.className = 'bi bi-moon-fill theme-icon';
        }
      }
    });
  }
}

class SectionRevealManager {
  constructor() {
    this.sections = document.querySelectorAll('section');
    this.init();
  }

  init() {
    const observerOptions = {
      root: null,
      // threshold: 0.2 means trigger when 20% visible
      // rootMargin extends the detection zone for short sections like #contact
      rootMargin: '-10% 0px -20% 0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
          // Set active attribute on body for global smooth color morphing
          document.body.setAttribute('data-active-section', entry.target.id);
        } else {
          entry.target.classList.remove('is-active');
        }
      });
    }, observerOptions);

    this.sections.forEach(section => observer.observe(section));
  }
}

class SectionObserverManager {
  constructor() {
    this.sections = document.querySelectorAll("section[id]");
    this.init();
  }

  init() {
    if (!this.sections.length) return;

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px", 
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId) {
            // Remove previous section-active classes safely
            Array.from(document.body.classList).forEach((className) => {
              if (className.startsWith("section-") && className.endsWith("-active")) {
                document.body.classList.remove(className);
              }
            });
            // Add active section class to <body>
            document.body.classList.add(`section-${sectionId}-active`);
          }
        }
      });
    }, observerOptions);

    this.sections.forEach((section) => observer.observe(section));
  }
}

class NavigationManager {
  constructor() {
    this.header = document.querySelector('#header') || document.querySelector('.site-header');
    this.navLinks = document.querySelectorAll('#navmenu a, .bottom-nav-item a');
    this.sections = document.querySelectorAll('section[id]');
    this.scrollTopBtn = document.querySelector('.scroll-top');
    this.init();
  }

  getHeaderHeight() {
    return this.header ? this.header.offsetHeight : 70;
  }

  init() {
    window.addEventListener('load', () => {
      this.handleScrollspy();
      this.handleHashScroll();
    });
    
    document.addEventListener('scroll', () => {
      this.handleScrollspy();
      this.toggleScrollTop();
    });

    if (this.scrollTopBtn) {
      this.scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const hash = link.hash;
        if (hash && document.querySelector(hash)) {
          e.preventDefault();
          this.scrollToElement(document.querySelector(hash));

          if (this.header && this.header.classList.contains('header-show')) {
            this.header.classList.remove('header-show');
          }
        }
      });
    });
  }

  scrollToElement(targetElement) {
    const headerOffset = this.getHeaderHeight();
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  toggleScrollTop() {
    if (this.scrollTopBtn) {
      if (window.scrollY > 100) {
        this.scrollTopBtn.classList.add('active');
      } else {
        this.scrollTopBtn.classList.remove('active');
      }
    }
  }

  handleScrollspy() {
    const headerHeight = this.getHeaderHeight();
    const position = window.scrollY + headerHeight + 10;

    this.sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (position >= top && position < top + height) {
        this.navLinks.forEach(link => {
          if (link.hash === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  handleHashScroll() {
    if (window.location.hash) {
      const targetSection = document.querySelector(window.location.hash);
      if (targetSection) {
        setTimeout(() => {
          this.scrollToElement(targetSection);
        }, 100);
      }
    }
  }
}

class AppInitializer {
  constructor() {
    this.initPreloader();
    this.initAOS();
    this.initTyped();
    this.initPureCounter();
    this.initSkillsAnimation();
    this.initGLightbox();
    this.initIsotope();
    this.initSwiper();
  }

  initPreloader() {
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
      });
    }
  }

  initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }

  initTyped() {
    const selectTyped = document.querySelector('.typed');
    if (selectTyped && typeof Typed !== 'undefined') {
      let typed_strings = selectTyped.getAttribute('data-typed-items');
      if (typed_strings) {
        typed_strings = typed_strings.split(',');
        new Typed('.typed', {
          strings: typed_strings,
          loop: true,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000
        });
      }
    }
  }

  initPureCounter() {
    if (typeof PureCounter !== 'undefined') {
      new PureCounter();
    }
  }

  initSkillsAnimation() {
    const skillsAnimation = document.querySelectorAll('.skills-animation');
    if (typeof Waypoint !== 'undefined') {
      skillsAnimation.forEach((item) => {
        new Waypoint({
          element: item,
          offset: '80%',
          handler: function() {
            const progress = item.querySelectorAll('.progress .progress-bar');
            progress.forEach(el => {
              const val = el.getAttribute('aria-valuenow') || el.style.width;
              el.style.width = val.includes('%') ? val : `${val}%`;
            });
          }
        });
      });
    }
  }

  initGLightbox() {
    if (typeof GLightbox !== 'undefined') {
      GLightbox({ selector: '.glightbox' });
    }
  }

  initIsotope() {
    if (typeof Isotope === 'undefined') return;

    document.querySelectorAll('.isotope-layout').forEach(isotopeItem => {
      const layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      const container = isotopeItem.querySelector('.isotope-container');
      if (!container) return;

      let initIsotope;
      if (typeof imagesLoaded !== 'undefined') {
        imagesLoaded(container, () => {
          initIsotope = new Isotope(container, {
            itemSelector: '.isotope-item',
            layoutMode: layout,
            filter: filter,
            sortBy: sort
          });
        });
      }

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(filterBtn => {
        filterBtn.addEventListener('click', function() {
          const activeBtn = isotopeItem.querySelector('.isotope-filters .filter-active');
          if (activeBtn) activeBtn.classList.remove('filter-active');
          this.classList.add('filter-active');

          if (initIsotope) {
            initIsotope.arrange({
              filter: this.getAttribute('data-filter')
            });
          }
        });
      });
    });
  }

  initSwiper() {
    if (typeof Swiper === 'undefined') return;

    document.querySelectorAll('.init-swiper').forEach(swiperElement => {
      const configElement = swiperElement.querySelector('.swiper-config');
      if (configElement) {
        try {
          const config = JSON.parse(configElement.innerHTML.trim());
          new Swiper(swiperElement, config);
        } catch (e) {
          console.error('Failed to parse Swiper configuration JSON:', e);
        }
      }
    });
  }
}

// Bootstrap Application on DOM Ready
// Remove SectionObserverManager (it conflicts by painting the body) 
// and ensure SectionRevealManager runs:

document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new SectionRevealManager(); // <--- THIS WAS MISSING
  new NavigationManager();
  new AppInitializer();
});