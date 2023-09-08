import {PrismaClient} from "@prisma/client";
const NEXT_PUBLIC_URL=process.env.NEXT_PUBLIC_URL;
if(!NEXT_PUBLIC_URL) {
    throw new Error("NEXT_PUBLIC_URL is not defined")
}

const prisma = new PrismaClient({
    log: ['query'],
});;


const getMods = async () => {
    console.log("get mods")
    try {
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
        return mods
    }catch (e) {
        console.error(e)
        return null;
    }

}

const getMod = async (mod_id: string) => {

    try {
        const mod = await prisma.mod.findUnique({
            where: {
                mod_id
            },
        });

        return mod
    }catch (e) {
        console.error(e)
        return null;
    }



}
export {getMods, getMod}