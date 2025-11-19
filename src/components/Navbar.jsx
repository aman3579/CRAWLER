import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, LayoutDashboard, Video } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800';
    };

    return (
        <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">G</span>
                            </div>
                            <span className="text-white font-bold text-lg hidden sm:block">GATE CS Super App</span>
                        </Link>
                    </div>
                    <div className="flex space-x-4">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors ${isActive('/')}`}
                        >
                            <Home size={18} />
                            <span className="hidden sm:inline">Home</span>
                        </Link>
                        <Link
                            to="/syllabus"
                            className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors ${isActive('/syllabus')}`}
                        >
                            <BookOpen size={18} />
                            <span className="hidden sm:inline">Syllabus</span>
                        </Link>
                        <Link
                            to="/practice"
                            className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors ${isActive('/practice')}`}
                        >
                            <LayoutDashboard size={18} />
                            <span className="hidden sm:inline">Practice</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
