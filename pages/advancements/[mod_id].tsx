"use client"

import React, {useEffect} from "react";
import {useAdmin} from "@/contexts/AdminContext";
import ModSidebar from "@/components/mods/ModSidebar";
import AdvancementTree from "@/components/advancements/AdvancementTree";
import {GetServerSidePropsContext} from "next";
import {getMod} from "@/helpers/APIHelper";

type AdvancementsProps = {
    mod: Mod
}
const Advancements = ({mod}: AdvancementsProps) => {

    const {setCurrentMod} = useAdmin()

    useEffect(() => {
        if(mod){
            setCurrentMod(mod)
            document.title = `${mod.displayName} - Advancements`
        }
    }, []);

    return (
        <div className="flex w-full h-full">

            {/* Header - Vertical Scroll */}
            <ModSidebar mod_id={mod.mod_id}/>

            {/* Content - Horizontal Scroll */}
            <div className="h-full dark:bg-gray-500 bg-light-gray-200 overflow-x-auto whitespace-nowrap grow relative" id={'horizontal-container'}>
                {/* Your horizontally scrollable content here */}
                <AdvancementTree/>

                <div className={'absolute bottom-0 left-0 p-2 flex flex-col space-y-2 text-sm'}>
                    <div className={'flex space-x-1 items-center font-semibold'}>
                        <span className={'w-5 h-5 rounded-full bg-green-600'}>

                        </span>
                        <p>Root quest</p>
                    </div>
                    <div className={'flex space-x-1 items-center font-semibold'}>
                        <span className={'w-5 h-5 rounded-full bg-red-600'}>

                        </span>
                        <p>Parent quest from another mod</p>
                    </div>
                </div>
            </div>

        </div>
    )
}



export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const mod_id = context.query.mod_id

    if(!mod_id) {
        return {
            notFound: true
        }
    }

    const mod = await getMod(mod_id.toString())
    console.log("Mod from GSSP", mod)
    if(mod == null || mod.error) {

        return {
            notFound: true
        }
    }

    return { props: { mod: mod.data } }
}


export default Advancements