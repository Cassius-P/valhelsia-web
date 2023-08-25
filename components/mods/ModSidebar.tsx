import {Tooltip} from "react-tooltip";
import React, {useEffect} from "react";
import {useAdmin} from "@/contexts/AdminContext";
import {cn} from "@/utils/Utils";
import {useRouter} from "next/router";


interface ModSidebarProps {
    mod_id?: string
}
const ModSidebar = ({mod_id}: ModSidebarProps) => {

    const {mods, fetchMods, setCurrentMod} = useAdmin()
    const router = useRouter();


    useEffect( () => {
        fetchMods().then((r:any) => console.log("fetched mods"))
    }, []);

    const handleClick = (mod:Mod) => {
        setCurrentMod(mod)
    }

    return (
        <div className="dark:bg-gray-600 w-24 h-screen text-black overflow-y-auto overflow-hidden" id={'vertical-sidebar'}>
            <div className={'grid grid-cols-1 gap-1 p-1 pr-4'}>
                {mods && mods.map((mod:Mod) => (
                    <div key={mod.mod_id} className="flex items-center w-full p-2 justify-center">
                        <Tooltip id={"main-tooltip"} className={'z-10'}/>
                        <div className={
                            cn('w-full aspect-square dark:bg-gray-700 rounded-full flex p-1 cursor-pointer hover:dark:bg-gray-500 transition-all',
                                {
                                    'dark:bg-gray-700 ': mod_id != mod.mod_id,
                                    'dark:bg-gray-500 ': mod_id == mod.mod_id,
                                }
                        )}
                             data-tooltip-id={'main-tooltip'}
                             data-tooltip-content={mod.displayName ? mod.displayName : mod.mod_id}
                             data-tooltip-place={'right'}
                                onClick={() => handleClick(mod)}
                        >
                            <span className={'bg-origin-content bg-center bg-no-repeat bg-contain w-full aspect-square rounded-full'}
                                  style={{backgroundImage: `url(data:image/png;base64,${mod.image_base64})`}}>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ModSidebar