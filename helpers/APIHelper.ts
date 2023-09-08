import {PrismaClient} from "@prisma/client";
const NEXT_PUBLIC_URL=process.env.NEXT_PUBLIC_URL;
if(!NEXT_PUBLIC_URL) {
    throw new Error("NEXT_PUBLIC_URL is not defined")
}

const prisma = new PrismaClient({
    log: ['query'],
});;


const getMods = async () => {
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/mods`);
    const data = await res.json();

    return data.data;
}

const getMod = async (mod_id: string) => {

    try {
        const mod = await prisma.mod.findUnique({
            where: {
                mod_id
            },
        });

        return mod
    }catch {

    }



}
export {getMods, getMod}