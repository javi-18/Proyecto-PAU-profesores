import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();
    const { profesorInfo } = require('../data/mock_postulantes');

    return (
        <nav className="bg-usm-blue shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-white text-xl font-bold hover:text-usm-secondary transition-colors">
                            PAU | Vista del Profesor
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-200 hidden sm:block">{profesorInfo.nombre}</span>
                        <button 
                            className="text-white hover:text-usm-secondary p-2 rounded-full transition duration-150 ease-in-out" 
                            aria-label="Perfil"
                            title="Perfil del profesor"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-6 w-6" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                strokeWidth="2"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" 
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
