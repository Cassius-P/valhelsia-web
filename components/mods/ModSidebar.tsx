
import React, {useEffect, useState} from "react";
import {useAdmin} from "@/contexts/AdminContext";
import {cn} from "@/libs/Utils";
import PlaceholderList from "@/components/mods/PlaceholderList";
import Link from "next/link";
import {Mod} from "@prisma/client";


interface ModSidebarProps {
    mod_id?: string
}
const ModSidebar = ({mod_id}: ModSidebarProps) => {

    const {fetchMods} = useAdmin()
    const [mods, setMods] = useState<Mod[]>([]);

    useEffect( () => {
        fetchMods().then((mods) => setMods(prev => mods))
    }, []);



    return (
        <div className="dark:bg-gray-600 bg-light-gray-400 w-24 h-screen text-black overflow-y-auto overflow-hidden" id={'vertical-sidebar'}>

            <nav className={'grid grid-cols-1 gap-1 p-1 pr-4'}>
                {mods && mods.map((mod:Mod, index) => (
                    <Link href={`/advancements/${mod.mod_id}`}
                        key={index} className="flex items-center w-full p-2 justify-center">

                        <div className={
                            cn('w-full aspect-square dark:bg-gray-700 bg-light-gray-700 rounded-full flex p-1 cursor-pointer hover:dark:bg-gray-500 hover:bg-[#b9b9b9]',
                                {
                                    'dark:bg-gray-700 bg-light-gray-700': mod_id != mod.mod_id,
                                    'dark:bg-gray-500 bg-[#b9b9b9]': mod_id == mod.mod_id,
                                }
                        )}

                             data-tooltip-id={'general-tip'}
                             data-tooltip-content={mod.displayName ? mod.displayName : mod.mod_id}
                             data-tooltip-place={'right'}

                        >
                            <span className={'bg-origin-content bg-center bg-no-repeat bg-contain w-full aspect-square rounded-full'}
                                  style={{backgroundImage: `url(https://cassiusbucket.s3.eu-west-3.amazonaws.com/minecraft/mods/${mod.mod_id}.png)`}}>
                            </span>
                        </div>
                    </Link>
                ))}

                {(mods == null || mods.length == 0) && (
                    <PlaceholderList/>
                )}


            </nav>
        </div>
    )
}

export default ModSidebar