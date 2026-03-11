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

    const navItems = [
        { name: 'Home', path: '/', icon: 'home' },
        { name: 'Services', path: '/services', icon: 'cog' },
        { name: 'About', path: '/about', icon: 'user' },
        { name: 'Projects', path: '/project', icon: 'project-diagram' },
        { name: 'Vlog', path: '/vlog', icon: 'blog' },
    ];

    return (
        <>
            <div className={`sticky top-0 z-50 w-full shadow-md transition-all duration-300 ${backgroundColor} ${baseTextColor}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        
                        {/* Logo Section */}
                        <Link to="/" className="flex items-center">
                            <div className="flex items-center justify-center h-16 w-[150px] overflow-visible py-1">
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="h-full w-full object-contain"
                                    style={{
                                        filter: isLight ? 'none' : 'brightness(0) invert(1)'
                                    }}
                                />
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <nav className="flex space-x-6 lg:space-x-8">
                                {navItems.map((item, i) => (
                                    <Link
                                        key={i}
                                        to={item.path}
                                        className="relative font-medium group transition-colors duration-300"
                                    >
                                        <span className={`transition-colors duration-300 ${hoverTextColor}`}>
                                            {item.name}
                                        </span>
                                        <span
                                            className={`absolute bottom-0 left-0 w-0 h-0.5 ${hoverUnderlineColor} group-hover:w-full transition-all duration-300`}
                                        ></span>
                                    </Link>
                                ))}
                            </nav>

                            {/* Desktop controls */}
                            <div className="flex items-center space-x-4 lg:space-x-6">
                                {/* Contact button */}
                                <button className={`${isLight ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'} text-white font-medium py-2 px-4 lg:px-6 rounded-lg transition duration-300 transform hover:scale-105 active:scale-95`}>
                                    <Link to="/Contact" className="inline-flex items-center">
                                        Contact Us
                                        <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
                                    </Link>
                                </button>
                            </div>
                        </div>

                        {/* Mobile controls */}
                        <div className="md:hidden flex items-center space-x-4">
                          
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
                                {navItems.map((item, i) => (
                                    <Link
                                        key={i}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`py-3 px-4 rounded-lg transition-colors duration-300 ${hoverTextColor} hover:bg-opacity-10 ${isLight ? 'hover:bg-blue-50' : 'hover:bg-gray-800'}`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <i className={`fas fa-${item.icon} w-5 text-center`}></i>
                                            <span>{item.name}</span>
                                        </div>
                                    </Link>
                                ))}
                            </nav>

                            {/* Mobile contact button */}
                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <Link
                                    to="/Contact"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`w-full ${isLight ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'} text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center space-x-2`}
                                >
                                    <span>Contact Us</span>
                                    <i className="fa-solid fa-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Navbar;