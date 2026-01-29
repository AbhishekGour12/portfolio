import { useState } from 'react';
import { Link } from 'react-router-dom';
// Import your logo image
import logo from '../Assets/logo.png'; 

// eslint-disable-next-line react/prop-types
function Navbar({ Profile1, mode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLight = Profile1 === 'white';

    const baseTextColor = isLight ? 'text-black' : 'text-white';
    const hoverTextColor = isLight ? 'hover:text-blue-600' : 'hover:text-orange-400';
    const hoverUnderlineColor = isLight ? 'bg-blue-600' : 'bg-orange-400';
    const backgroundColor = isLight ? 'bg-white' : 'bg-slate-900';

    return (
        <>
            <div className={`sticky top-0 z-50 w-full shadow-md transition-all duration-300 ${backgroundColor} ${baseTextColor}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        
                        {/* --- MODIFIED LOGO SECTION START --- */}
                        <Link to="/" className="flex items-center">
                            {/* 1. Removed fixed width classes (w-10).
                                2. Increased Height: h-12 (mobile) and h-16 (desktop).
                                3. Set w-auto so the logo isn't squashed.
                            */}
                            <div className="flex items-center justify-center  h-16 w-[150px] overflow-visible py-1 ">
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="h-full  w-full object-contain" 
                                    style={{
                                        filter: isLight ? 'none' : 'brightness(0) invert(1)'
                                    }}
                                />
                            </div>
                            {/* Removed the "Portfolio" span here */}
                        </Link>
                        {/* --- MODIFIED LOGO SECTION END --- */}

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <nav className="flex space-x-6 lg:space-x-8">
                                {['/', '/About', '/Project', '/Vlog'].map((path, i) => {
                                    const name = ['Home', 'About', 'Projects', 'Vlog'][i];
                                    return (
                                        <Link
                                            key={i}
                                            to={path}
                                            className="relative font-medium group transition-colors duration-300"
                                        >
                                            <span className={`transition-colors duration-300 ${hoverTextColor}`}>
                                                {name}
                                            </span>
                                            <span
                                                className={`absolute bottom-0 left-0 w-0 h-0.5 ${hoverUnderlineColor} group-hover:w-full transition-all duration-300`}
                                            ></span>
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Desktop controls */}
                            <div className="flex items-center space-x-4 lg:space-x-6">
                                {/* Dark mode toggle */}
                                <div className="flex items-center">
                                    <button
                                        onClick={mode}
                                        className="relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        aria-label="Toggle dark mode"
                                    >
                                        <span className={`sr-only`}>Toggle dark mode</span>
                                        <span className={`inline-block h-4 w-4 transform rounded-full transition-transform ${isLight ? 'translate-x-1 bg-yellow-400' : 'translate-x-6 bg-white'}`} />
                                        <span className="absolute inset-0 rounded-full bg-gray-300 dark:bg-gray-700" />
                                    </button>
                                    <span className="ml-2">
                                        {isLight ? (
                                            <i className="fa-solid fa-sun text-yellow-400 text-lg"></i>
                                        ) : (
                                            <i className="fa-solid fa-moon text-white text-lg"></i>
                                        )}
                                    </span>
                                </div>

                                {/* Contact button */}
                                <button className={`${isLight ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'} text-white font-medium py-2 px-4 lg:px-6 rounded-lg transition duration-300 transform hover:scale-105 active:scale-95`}>
                                    <a href="#contact" className="inline-flex items-center">
                                        Contact Us
                                        <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
                                    </a>
                                </button>
                            </div>
                        </div>

                        {/* Mobile controls */}
                        <div className="md:hidden flex items-center space-x-4">
                            {/* Dark mode toggle - mobile */}
                            <div className="flex items-center">
                                <button
                                    onClick={mode}
                                    className="relative inline-flex h-5 w-10 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    aria-label="Toggle dark mode"
                                >
                                    <span className={`sr-only`}>Toggle dark mode</span>
                                    <span className={`inline-block h-3 w-3 transform rounded-full transition-transform ${isLight ? 'translate-x-1 bg-yellow-400' : 'translate-x-5 bg-white'}`} />
                                    <span className="absolute inset-0 rounded-full bg-gray-300 dark:bg-gray-700" />
                                </button>
                                <span className="ml-1">
                                    {isLight ? (
                                        <i className="fa-solid fa-sun text-yellow-400"></i>
                                    ) : (
                                        <i className="fa-solid fa-moon text-white"></i>
                                    )}
                                </span>
                            </div>

                            {/* Mobile menu icon */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMenuOpen ? (
                                    <i className="fas fa-times text-2xl"></i>
                                ) : (
                                    <i className="fas fa-bars text-2xl"></i>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className={`md:hidden w-full px-4 py-6 ${backgroundColor} ${baseTextColor} transition-all duration-300 ease-in-out`}>
                        <div className="max-w-7xl mx-auto">
                            <nav className="flex flex-col space-y-4 font-medium">
                                {['/', '/About', '/Project', '/Vlog'].map((path, i) => {
                                    const name = ['Home', 'About', 'Projects', 'Vlog'][i];
                                    return (
                                        <Link
                                            key={i}
                                            to={path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`py-3 px-4 rounded-lg transition-colors duration-300 ${hoverTextColor} hover:bg-opacity-10 ${isLight ? 'hover:bg-blue-50' : 'hover:bg-gray-800'}`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <i className={`fas fa-${i === 0 ? 'home' : i === 1 ? 'user' : i === 2 ? 'project-diagram' : 'blog'} w-5 text-center`}></i>
                                                <span>{name}</span>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Mobile contact button */}
                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`w-full ${isLight ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'} text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center space-x-2`}
                                >
                                    <a href="#contact" className="flex items-center space-x-2">
                                        <span>Contact Us</span>
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </a>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Navbar;