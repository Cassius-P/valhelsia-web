import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
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
    downloadUrl: string | null;
    latestVersion: string | null;
};

export const AdminContext = createContext<AdminContextType | undefined>(undefined)
AdminContext.displayName = "AdminContext";


export const AdminProvider= ({children} : {children:ReactNode}) => {

    const router = useRouter()

    const [players, setPlayers] = useState<any>([])

    const [mods, setMods] = useState<Mod[] | null>(null)
    const [currentMod, setCurrentMod] = useState<Mod | null>( null )

    const [advancements, setAdvancements] = useState<Advancement[]>([])


    const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
    const [latestVersion, setLatestVersion] = useState<string | null>(null)

    const fetchPlayers = async () => {
        const url = "/api/players";
        let res = await fetch(`${url}`);
        const json = await res.json();

        setPlayers([json]);
    }

    const fetchMods = async () => {

        let modList = await getMods()
        setMods(modList);
        return modList;
    }

    const findMod = async (mod_id:string) => {


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

    const fectchLastJarURL = async () => {
        fetch(`/api/jar`)
            .then((response) => response.json())
            .then((data: {version:string, url:string}) => {
                // Assuming the asset is the first one in the list

                setDownloadUrl(data.url);
                setLatestVersion(data.version);
            })
            .catch((error) => {
                console.error('Error fetching GitHub release:', error);
            });
    }



    useEffect(() => {
        fetchPlayers()
        fectchLastJarURL()
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
                fetchAdvancements,
                downloadUrl,
                latestVersion
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