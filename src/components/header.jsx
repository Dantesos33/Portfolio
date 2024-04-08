import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import '../output.css'
import './header.css'
import navbar from '../navbar'
import logo from '../assets/logo2.png'
import { BiCoffee } from 'react-icons/bi'
import './skills'
import './hero'
import './projects'

const header = () => {
  const useActiveLink = (sectionId) => {
    const location = useLocation();

    return location.hash === `#${sectionId}`;
  };

  return (
    <>
      <header id='home' className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex-col flex-wrap flex p-5 md:flex-row items-center justify-between">
          <Link to='./' className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <img src={logo} alt="" className='w-12 rounded-full object-cover' />
            <span className="text-xl -ml-3 tracking-widest">uhaddis</span>
          </Link>
          <nav className="md:ml-auto md:mr-auto flex items-center text-base justify-center left-2/4 -translate-x-1/2 bg-indigo-500 fixed z-20 rounded-full p-2">
            {
              navbar.map((el) => {
                const isActive = useActiveLink(el.path); // Get active state
                return (
                  <>
                    <HashLink smooth key={el.name} to={`#${el.path}`} className={`mr-5 text-black flex items-center cursor-pointer hover:text-white ${isActive ?  "active" : ""}`}>
                      <div className='text-xl px-4 sm:text-base sm:px-0 nav-icons'>{el.icon}</div>
                      <div className='hidden sm:inline-flex nav-links ml-2'>{el.name}</div>
                    </HashLink>
                  </>
                )
              })
            }
          </nav>
          <button className="items-center hidden md:inline-flex text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">Have a Coffee
            <div className='ml-1'><BiCoffee /></div>
          </button>
        </div>
      </header>
    </>
  )
}

export default header