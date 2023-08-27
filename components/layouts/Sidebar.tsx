"use client"

import Link from "next/link";
import React, {useEffect} from "react";
import {useUI} from "@/contexts/UIContext";

const Sidebar = () => {

    const {lightMode, setTheme, mounted} = useUI()




    const handleTheme = () => {
       setTheme(lightMode ? 'dark' : 'light')
    }

    return (
        <div className={` h-screen absolute dark:bg-gray-700 bg-light-gray-500 shadow-md w-16 justify-center flex items-center z-10`} id={"sidebar"}>


            <div className={"flex flex-col items-center h-full py-4 justify-between"}>

                <div className={'flex flex-col space-y-4'}>
                    <div data-tooltip-id={'general-tip'} data-tooltip-place={'right'} data-tooltip-content={'Map'} className={'group'}>
                        <Link href={'/'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                 className="w-8 h-8 group-hover:dark:fill-white group-hover:fill-gray-600 transition-all">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                            </svg>
                        </Link>
                    </div>
                    <div data-tooltip-id={'general-tip'} data-tooltip-place={'right'} data-tooltip-content={'Achievements'} className={'group'}>
                        <Link href={'/advancements'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 group-hover:dark:fill-white group-hover:fill-gray-600 transition-all">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <div>
                    {mounted && (
                        <button onClick={handleTheme} className={'group'}>
                            {lightMode ? (
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor"
                                     className="w-8 h-8 group-hover:dark:fill-amber-300 group-hover:dark:text-amber-300 group-hover:fill-yellow-500 group-hover:text-yellow-500 transition-all duration-300">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                </svg>

                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor"
                                     className="w-8 h-8 group-hover:dark:fill-amber-300 group-hover:dark:text-amber-300 group-hover:fill-yellow-500 group-hover:text-yellow-500 transition-all duration-300">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                </svg>

                                )}
                        </button>
                    )}
                </div>
            </div>

        </div>
    )

}
export default Sidebar