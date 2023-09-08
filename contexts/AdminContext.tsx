import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {getMod, getMods} from "@/helpers/APIHelper";
import {Achievement, Mod} from "@prisma/client";



type AdminContextType = {
    //fetchMods: () => Promise<Mod[]>;
    currentMod: Mod | null;
    setCurrentMod: (mod: Mod | null) => void;
    findMod: (mod_id: string) => Promise<Mod | null>;
    fetchAdvancements: (mod_id: string) => Promise<Achievement[]>;
    downloadUrl: string | null;
    latestVersion: string | null;
    searchAdvancementQuery: (query: string) => Promise<Achievement[]>;
};

export const AdminContext = createContext<AdminContextType | undefined>(undefined)
AdminContext.displayName = "AdminContext";


export const AdminProvider= ({children} : {children:ReactNode}) => {

    const [currentMod, setCurrentMod] = useState<Mod | null>( null )

    const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
    const [latestVersion, setLatestVersion] = useState<string | null>(null)


    /*const fetchMods = async () => {

        const mods = await prisma.mod.findMany({
            select: {
                mod_id: true,
                displayName: true,
                description: true,
            },
            orderBy: {
                displayName: 'asc',
            },
        });
    }*/

    const findMod = async (mod_id:string) => {


        let mod = await getMod(mod_id)
        if(mod == null) {
            return null;
        }

        return mod as Mod
    }

    const fetchAdvancements = async (mod_id:string) => {
        const url = `/api/advancements/${mod_id}`;
        let res = await fetch(`${url}`);
        const json = await res.json();

       return json.data as Achievement[];
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
        fectchLastJarURL()
    }, []);


    const searchAdvancementQuery = async (query:string) => {
        const url = `/api/advancements/search?q=${query}`;
        let res = await fetch(`${url}`);
        const json = await res.json();

        return json.data as Achievement[];
    }



    return (
        <AdminContext.Provider value={
            {
                //fetchMods,
                currentMod,
                setCurrentMod,
                findMod,
                fetchAdvancements,
                downloadUrl,
                latestVersion,
                searchAdvancementQuery
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