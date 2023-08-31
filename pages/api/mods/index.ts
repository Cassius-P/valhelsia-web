import {NextApiRequest, NextApiResponse} from "next";
import {getConnection} from "@/helpers/DBHelper";

const handler = async (req:NextApiRequest, res:NextApiResponse) => {

    if (req.method === 'GET') {
        await GET(req, res)
    }


}
const GET = async (req:NextApiRequest, res:NextApiResponse) => {
    const conn = await getConnection();

    try {
        const query = `SELECT mod_id, displayName, description FROM su_mods ORDER BY displayName;` ;
        const data= await conn.execute(query);
        res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}

export default handler