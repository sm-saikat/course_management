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
} from "react-bootstrap-icons";

const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState(false);

    const pathname = usePathname();
    const session = useSession();

    useEffect(() => {
        // Get active menu from url path
        setActiveMenu(pathname);
    }, [pathname]);

    return (
        <aside className="px-2 h-full">
            <nav>
                <ul className="flex flex-col gap-2">
                    <Link
                        className={`flex gap-2 py-2 px-4 dark:text-white ${pathname == "/" ? "bg-soft_bg dark:text-secondary" : "hover:bg-soft_bg"
                            } rounded-md`}
                        href={"/"}
                    >
                        <House size={20} className="text-primary" /> Home
                    </Link>

                    {
                        session.data?.user?.role === "lecturer" ? (
                            <Link
                                className={`flex gap-2 py-2 px-4 dark:text-white ${pathname == "/courses/create" ? "bg-soft_bg dark:text-secondary" : "hover:bg-soft_bg"
                                    } rounded-md`}
                                href={"/courses/create"}
                            >
                                <MortarboardFill className="text-primary" size={20} /> Create Course
                            </Link>
                        ) : (

                            <Link
                                className={`flex gap-2 py-2 px-4 dark:text-white ${pathname == "/courses" ? "bg-soft_bg dark:text-secondary" : "hover:bg-soft_bg"
                                    } rounded-md`}
                                href={"/courses"}
                            >
                                <MortarboardFill className="text-primary" size={20} /> My Course
                            </Link>
                        )
                    }
                    <Link
                        className={`flex gap-2 py-2 px-4 dark:text-white ${pathname == "/about" ? "bg-soft_bg dark:text-secondary" : "hover:bg-soft_bg"
                            } rounded-md`}
                        href={"/about"}
                    >
                        <Question className="text-primary" size={24} /> About
                    </Link>
                    <Link
                        className={`flex gap-2 py-2 px-4 dark:text-white ${pathname == "/contact" ? "bg-soft_bg dark:text-secondary" : "hover:bg-soft_bg"
                            } rounded-md`}
                        href={"/contact"}
                    >
                        <Headset className="text-primary" size={20} /> Contact
                    </Link>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
