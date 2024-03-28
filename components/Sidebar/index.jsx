"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
    House,
    Question,
    MortarboardFill,
    Headset,
    BoxArrowDownLeft,
    BoxArrowLeft,
    BoxArrowRight,
} from "react-bootstrap-icons";

const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState(false);
    const [sidebarClose, setSidebarClose] = useState(false);

    const pathname = usePathname();
    const session = useSession();

    useEffect(() => {
        // Get active menu from url path
        setActiveMenu(pathname);
    }, [pathname]);

    const handleSidebarClose = () => {
        setSidebarClose(prev => !prev);
    }

    return (
        <aside className={`px-2 h-full ${sidebarClose ? 'w-[100px]' : 'w-[250px]'}`}>
            <button onClick={handleSidebarClose} className={`border-2 dark:border-gray-200 p-2 mb-4 ${sidebarClose && 'bg-gray-200 dark:bg-gray-400'} hover:bg-gray-200 dark:hover:bg-gray-400`}>{sidebarClose ? <BoxArrowRight className="dark:text-gray-200" /> : <BoxArrowLeft className="dark:text-gray-200" />}</button>
            <nav>
                <ul className="flex flex-col gap-2">
                    
                    <Link
                        className={`flex ${sidebarClose && 'justify-center'} gap-2 py-2 px-4 ${pathname == "/dashboard" ? "bg-soft_bg dark:text-secondary" : "hover:bg-soft_bg dark:text-gray-200"
                            } rounded-md`}
                        href={"/dashboard"}
                    >
                        <House size={20} className="text-primary" />{!sidebarClose && ' Home'}
                    </Link>

                    {
                        session.data?.user?.role === "lecturer" ? (
                            <Link
                                className={`flex ${sidebarClose && 'justify-center'} gap-2 py-2 px-4 ${pathname == "/courses/create" ? "bg-soft_bg dark:text-secondary" : "hover:bg-soft_bg dark:text-gray-200"
                                    } rounded-md`}
                                href={"/courses/create"}
                            >
                                <MortarboardFill className="text-primary" size={20} />{!sidebarClose && ' Create Course'}
                            </Link>
                        ) : (

                            <Link
                                className={`flex ${sidebarClose && 'justify-center'} gap-2 py-2 px-4 ${pathname == "/courses" ? "bg-soft_bg dark:text-secondary" : "hover:bg-soft_bg dark:text-gray-200"
                                    } rounded-md`}
                                href={"/courses"}
                            >
                                <MortarboardFill className="text-primary" size={20} />{!sidebarClose && ' My Courses'}
                            </Link>
                        )
                    }
                    <Link
                        className={`flex ${sidebarClose && 'justify-center'} gap-2 py-2 px-4 ${pathname == "/about" ? "bg-soft_bg dark:text-secondary" : "hover:bg-soft_bg dark:text-gray-200"
                            } rounded-md`}
                        href={"/about"}
                    >
                        <Question className="text-primary" size={24} />{!sidebarClose && ' About'}
                    </Link>
                    <Link
                        className={`flex ${sidebarClose && 'justify-center'} gap-2 py-2 px-4 ${pathname == "/contact" ? "bg-soft_bg dark:text-secondary" : "hover:bg-soft_bg dark:text-gray-200"
                            } rounded-md`}
                        href={"/contact"}
                    >
                        <Headset className="text-primary" size={20} />{!sidebarClose && ' Contact'}
                    </Link>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
