import React, {useEffect, useState} from "react";
import {useAdmin} from "@/contexts/AdminContext";
import ModSidebar from "@/components/mods/ModSidebar";
import AdvancementTree from "@/components/advancements/AdvancementTree";
import {GetServerSidePropsContext} from "next";
import {getMod} from "@/helpers/APIHelper";
import {useRouter} from "next/router";
import {Mod} from "@prisma/client";

type AdvancementsProps = {
    mod: Mod
}
const Advancements = ({mod}: AdvancementsProps) => {

    const {setCurrentMod} = useAdmin()
    const router = useRouter()
    const [prevMod, setPrevMod] = useState<Mod | null>(null)
    const [targetID, setTargetID] = useState<string | null>(null);

    useEffect(() => {
        if(mod && mod.mod_id !== prevMod?.mod_id){
            setCurrentMod(mod)
            setPrevMod(mod)
            document.title = `${mod.displayName} - Advancements`
        }
    }, [mod]);

    useEffect(() => {
        const updateTargetId = () => {
            const hash = router.asPath.split('#')[1];
            setTargetID(hash);
        };

        // Initial call
        updateTargetId();

        // The 'routeChangeComplete' event will trigger whenever the URL changes
        router.events.on('routeChangeComplete', updateTargetId);

        // Cleanup
        return () => {
            router.events.off('routeChangeComplete', updateTargetId);
        };
    }, [router]);

    return (
        <div className="flex w-full h-full">

            {/* Header - Vertical Scroll */}
            <ModSidebar mod_id={mod.mod_id}/>

            {/* Content - Horizontal Scroll */}
            <div className="h-full dark:bg-gray-500 bg-light-gray-200 overflow-x-auto whitespace-nowrap grow relative" id={'horizontal-container'}>
                {/* Your horizontally scrollable content here */}
                <AdvancementTree mod={mod} targetID={targetID}/>

                {/* Legend */}
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
    if(mod == null || mod.error) {
        return {
            notFound: true
        }
    }

    return { props: { mod: mod.data } }
}


export default Advancements