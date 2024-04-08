import React from 'react'
import './type.css'
import profile from '../assets/Muhaddis-mob.jpg'


const hero = () => {

    return (
        <>
            <section id='hero' className="text-gray-400 bg-gray-900 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10 flex items-center justify-center drop-shadow-lg">
                        <img className="lg:w-1/2 object-cover object-center" style={{ borderRadius: "50%" }} alt="hero" src={profile}></img>
                    </div>
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">I'm,
                            {/* <br className="hidden md:inline-block"></br>Meet Frontend Dev */}
                            <div className='type text-xl lg:text-3xl text-indigo-500'>
                                <ul className="t">
                                    <li>Dev</li>
                                    <li>Frontend</li>
                                    <li>Creative</li>
                                    <li>Artistic</li>
                                    <li>Talented</li>
                                </ul>
                            </div>
                        </h1>
                        <p className="mb-8 leading-relaxed">Mastering the art of frontend development.
                            Building responsive and performant web experiences.
                            I'm here to turn your vision into reality.</p>
                        <div className="flex justify-center">
                            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Hire Me</button>
                            <button className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">Download CV</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default hero;
