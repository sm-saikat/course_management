"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Sun, SunFill } from "react-bootstrap-icons";

const Navbar = () => {
    const [openDropdown, setOpenDropdown] = useState(false);

    const session = useSession();

    return (
        <>
            <nav className="bg-white dark:bg-gray-700 border-b">
                <div className="mx-auto px-10">
                    <div className="flex justify-between items-center py-4">
                        <div>
                            <Link
                                href="/"
                                className="text-2xl font-bold text-gray-800 dark:text-white"
                            >
                                Logo
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">

                            {
                                session.data ? (
                                    <>
                                        <div className="hidden sm:block">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                    <svg
                                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                                        />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="search"
                                                    id="default-search"
                                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Search any course..."
                                                    required=""
                                                />
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <img
                                                className="w-8 h-8 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 cursor-pointer"
                                                src={`/uploads/${session.data?.user?.profile_img}`}
                                                alt="Bordered avatar"
                                                onClick={() => setOpenDropdown((prev) => !prev)}
                                            />
                                            <div
                                                id="dropdown"
                                                className={`z-10 ${openDropdown ? "" : "hidden"
                                                    } absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                                            >
                                                <ul
                                                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                                    aria-labelledby="dropdownDefaultButton"
                                                >
                                                    <li>
                                                        <Link
                                                            href={'/profile'}
                                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                                            onClick={() => {
                                                                setOpenDropdown(false);
                                                            }}
                                                        >
                                                            Profile
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                                            onClick={() => {
                                                                setOpenDropdown(false);
                                                                signOut();
                                                            }}
                                                        >
                                                            Log out
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex gap-4">
                                        <Link className="hover:text-primary dark:text-gray-200" href="/auth/login">Login</Link>
                                        <Link className="hover:text-primary dark:text-gray-200" href="/auth/register">Register</Link>
                                    </div>
                                )
                            }

                            <div className="flex items-center">
                                <button type="button" id="theme-toggle">
                                    <Sun
                                        size={20}
                                        className="hidden cursor-pointer text-white"
                                        id="theme-toggle-light-icon"
                                    />
                                    <SunFill
                                        size={20}
                                        className="hidden cursor-pointer"
                                        id="theme-toggle-dark-icon"
                                    />
                                </button>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="block sm:hidden"
                                    id="mobile-menu-button"
                                >
                                    <svg
                                        className="w-6 h-6 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16m-7 6h7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
