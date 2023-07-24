import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png"


const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);

    const handleMenuToggle = () => {
        setShowMenu((prev) => !prev);
    };

    return (
        <nav className="w-11/12 mx-auto">
            <div className="flex justify-between items-center py-4">
                {/* Left side - Logo */}
                <div className="flex justify-start">
                    <a href="#">
                        <img
                            className="h-10 w-auto sm:h-10"
                            src={logo}
                            alt="Logo"
                        />
                    </a>
                </div>

                {/* Middle - Links */}
                <div className="hidden md:flex space-x-8 text-base">
                    <a href="#" className="text-[#E53935] font-semibold">
                        Home
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        Menu
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        Products
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        Testimonials
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        About Us
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        Contact
                    </a>
                </div>

                {/* Right side - User Avatar and Shopping Cart */}
                <div className="hidden md:flex items-center space-x-4">

                    <div class="relative inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <span class="absolute -top-2 -right-1 bg-[#E53935] text-white rounded-full px-1 py-.5 text-xs font-semibold">5</span>
                    </div>



                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>

                </div>

                {/* Mobile menu icon */}
                <div className="md:hidden flex items-center space-x-4">
                    <div class="relative inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <span class="absolute -top-2 -right-1 bg-[#E53935] text-white rounded-full px-1 py-.5 text-xs font-semibold">5</span>
                    </div>
                    <motion.div

                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >

                        <svg onClick={handleMenuToggle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </motion.div>
                </div>
            </div>

            {/* Mobile menu */}
            {showMenu && (
                <motion.div
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="md:hidden bg-white shadow-xl p-5 space-y-1 absolute top-0 right-0 w-4/6 z-50 h-screen"
                >
                    <div className="w-full flex items-center justify-end">
                        <svg onClick={handleMenuToggle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>

                    </div>
                    <div className="flex flex-col space-y-2 pt-4">
                        <a className="block bg-[#e53935] text-white rounded px-4 py-1">
                            Home
                        </a>
                        <div className="w-full h-[1px] bg-gray-200"></div>

                        <a className="block rounded px-4 py-1">
                            Menu
                        </a>
                        <div className="w-full h-[1px] bg-gray-200"></div>
                        <a className="block rounded px-4 py-1">
                            Products
                        </a>
                        <div className="w-full h-[1px] bg-gray-200"></div>

                        <a className="block rounded px-4 py-1">
                            Testimonials
                        </a>
                        <div className="w-full h-[1px] bg-gray-200"></div>

                        <a className="block rounded px-4 py-1">
                            About Us
                        </a>
                        <div className="w-full h-[1px] bg-gray-200"></div>

                        <a className="block rounded px-4 py-1">
                            Cotnact
                        </a>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;