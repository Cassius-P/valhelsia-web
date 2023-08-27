import {createContext, FC, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";
import {AdvancementTree} from "@/models/AdvancementTree";
import {getMod, getMods} from "@/helpers/APIHelper";



type AdminContextType = {
    players: any[];
    mods: Mod[] | null;
    fetchMods: () => Promise<Mod[]>;
    currentMod: Mod | null;
    setCurrentMod: (mod: Mod | null) => void;
    findMod: (mod_id: string) => Promise<Mod | null>;
    advancements: Advancement[];
    fetchAdvancements: (mod_id: string) => void;
};

export const AdminContext = createContext<AdminContextType | undefined>(undefined)
AdminContext.displayName = "AdminContext";


export const AdminProvider= ({children} : {children:ReactNode}) => {

    const router = useRouter()

    const [players, setPlayers] = useState<any>([])

    const [mods, setMods] = useState<Mod[] | null>(null)
    const [currentMod, setCurrentMod] = useState<Mod | null>( null )

    const [advancements, setAdvancements] = useState<Advancement[]>([])

    const fetchPlayers = async () => {
        const url = "/api/players";
        let res = await fetch(`${url}`);
        const json = await res.json();

        setPlayers([json]);
    }

    const fetchMods = async () => {

        /*const url = "/api/mods";
        let res = await fetch(`${url}`);
        const json = await res.json();


        let modList: Mod[] = json.data[0] as Mod[];*/

        let modList = await getMods()
        setMods(modList);
        return modList;
    }

    const findMod = async (mod_id:string) => {
        console.log("Mods",mods)
        /*if(mods == null){

            fetchMods().then((modList) => {
                console.log("ModList", modList)
                let found = modList.find((mod:Mod) => mod.mod_id == mod_id)

                console.log("Found",found)
                return found
            })

            return undefined;
        }

        return mods.find((mod:Mod) => mod.mod_id == mod_id)*/

        let mod = await getMod(mod_id)
        if(mod == null || mod["error"]) {
            return null;
        }

        return mod.data as Mod
    }

    const fetchAdvancements = async (mod_id:string) => {
        const url = `/api/advancements/${mod_id}`;
        let res = await fetch(`${url}`);
        const json = await res.json();

        setAdvancements(json.data as Advancement[]);
    }


    useEffect(() => {
        fetchPlayers()
    }, []);

    useEffect(() => {

        if(currentMod) {
            fetchAdvancements(currentMod.mod_id)
            router.push(`/advancements/${currentMod.mod_id}`)
        }
    }, [currentMod]);



    return (
        <AdminContext.Provider value={
            {
                players,
                mods,
                fetchMods,
                currentMod,
                setCurrentMod,
                findMod,
                advancements,
                fetchAdvancements
            }
        }>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdmin must be used within an AdminProvider");
    }
    return context;
};