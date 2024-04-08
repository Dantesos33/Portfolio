import React, { useState, useEffect } from 'react';
import '../output.css';
import './skills.css';

const skillsData = require('../skill.js').default; // Assuming your data is exported as default

const Skills = () => { // Rename to Skills with uppercase S
  const [visibleCards, setVisibleCards] = useState(6); // Initial number of visible cards

  const [skills, setSkills] = useState([]); // State to store retrieved skills

  useEffect(() => {
    setSkills(skillsData); // Fetch data on component mount
  }, []); // Empty dependency array ensures data is fetched only once

  const handleShowMore = () => {
    setVisibleCards(skills.length); // Show all remaining cards
  };

  const displayedSkills = skills.slice(0, visibleCards); // Slice skills based on visibility

  return (
    <>
      <section id='skills' className="text-gray-400 body-font bg-gray-700">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
              My Skills
            </h1>
          </div>
          <div className="flex flex-wrap -m-4">
            {displayedSkills.map((skill) => (
              <div className="p-4 w-full md:w-1/2 lg:w-1/3" key={skill.name}>
                <div className="border bg-gray-900 border-gray-700 border-opacity-75 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 mb-4">
                    {skill.logo}
                  </div>
                  <h2 className="text-lg text-white font-medium title-font mb-2">
                    {skill.name}
                  </h2>
                  <div className="progress-bar">
                    <div className="progress-line bg-indigo-900" style={{ width: skill.progress }}>
                      <p className="progress-percent">{skill.progress}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {skills.length > visibleCards && ( // Show button only if more cards exist
            <button
              className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={handleShowMore}
            >
              Show More
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default Skills;