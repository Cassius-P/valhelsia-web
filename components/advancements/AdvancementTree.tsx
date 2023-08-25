import {useAdmin} from "@/contexts/AdminContext";
import React, {useEffect} from "react";
import dynamic from "next/dynamic";


const AdvancementTree = () => {

    const {currentMod, advancements} = useAdmin()
    const Tree = dynamic(() => import('./TreeComponent'), {
        ssr: false
    })


    return (
        <div className={'relative w-full h-full'}>

            <div className={'absolute top-2 left-4'}>
                <h1 className={'font-semibold text-xl'}>
                    {currentMod ? currentMod.displayName : "No mod selected"}
                </h1>


            </div>

            <section className={'w-full h-full'}>
                <Tree trees={advancements}/>
            </section>
        </div>

    )


}

export default AdvancementTree