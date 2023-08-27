const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;
if (NEXT_PUBLIC_URL == null) throw new Error("NEXT_PUBLIC_URL is not defined");



const getMods = async () => {
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/mods`);
    const data = await res.json();

    console.log("get Mods", data)

    return data.data[0] as Mod[];
}

const getMod = async (mod_id: string) => {
    const url = `${NEXT_PUBLIC_URL}/api/mods/${mod_id}`
    const res = await fetch(url);
    const data = await res.json();

    console.log("Data APIHelper", data)
    return data
}
export {getMods, getMod}