import {useAdmin} from "@/contexts/AdminContext";
import React, {useEffect} from "react";
import D3 from "@/components/advancements/D3";


const AdvancementTree = () => {

    const {currentMod, advancements} = useAdmin()



    return (
        <div className={'relative w-full h-full'}>

            <div className={'absolute top-2 left-4 z-10'}>
                <h1 className={'font-semibold text-xl text '}>
                    {currentMod ? currentMod.displayName : "No mod selected"}
                </h1>


            </div>

            <section className={'w-full h-screen overflow-hidden'}>
                <D3 trees={advancements}/>
            </section>
        </div>

    )


}

export default AdvancementTree