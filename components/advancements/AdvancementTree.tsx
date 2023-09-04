import {useAdmin} from "@/contexts/AdminContext";
import React, {useEffect, useState} from "react";
import D3 from "@/components/advancements/D3";
import {useRouter} from "next/router";

interface AdvancementTreeProps {
    mod: Mod
    targetID: string | null
}
const AdvancementTree = ({mod, targetID} : AdvancementTreeProps) => {

    const {fetchAdvancements} = useAdmin()
    const [advancements, setAdvancements] = useState<Advancement[] | null>(null);

    useEffect(() => {
        fetchAdvancements(mod.mod_id).then((advancements) => {
            setAdvancements(advancements)
        })
    }, [mod]);


    return (
        <div className={'relative w-full h-full'}>

            <div className={'absolute top-2 left-4 z-10'}>
                <h1 className={'font-semibold text-xl text '}>
                    {mod ? mod.displayName : "No mod selected"}
                </h1>


            </div>

            <section className={'w-full h-screen overflow-hidden'}>
                {advancements != null &&
                    <D3 trees={advancements} targetID={targetID}/>
                }
            </section>
        </div>

    )
}

export default AdvancementTree