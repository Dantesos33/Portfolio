import React from "react";
import Header from './components/header';
import Hero from './components/hero';
import Skills from './components/skills';
import Projects from './components/projects';

const App = () => {
  return (
    <div className="App">
      <Header/>
      <Hero/>
      <Skills/>
      <Projects/>
    </div>
  );
}

export default App;
