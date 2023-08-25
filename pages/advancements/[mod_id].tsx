import React, {useEffect} from "react";
import {useAdmin} from "@/contexts/AdminContext";
import Image from "next/image";
import {Tooltip} from "react-tooltip";
import ModSidebar from "@/components/mods/ModSidebar";
import {useRouter} from "next/router";
import AdvancementTree from "@/components/advancements/AdvancementTree";


const Advancements = () => {

    const router = useRouter();
    const {currentMod, setCurrentMod, findMod} = useAdmin()
    let modID: string = "advancedperipherals"
    if(router.query.mod_id) {
        modID = router.query.mod_id.toString()
        if(currentMod == null) {
            setCurrentMod(findMod(modID))
        }
    }


    return (
        <div className="flex w-full h-full">

            {/* Header - Vertical Scroll */}
            <ModSidebar mod_id={modID}/>

            {/* Content - Horizontal Scroll */}
            <div className="h-full dark:bg-gray-500 overflow-x-auto whitespace-nowrap grow relative" id={'horizontal-container'}>
                {/* Your horizontally scrollable content here */}

                <AdvancementTree/>



            </div>

        </div>
    )
}

export default Advancements