import {NextApiRequest, NextApiResponse} from "next";
import {getConnection} from "@/helpers/DBHelper";

const handler = async (req:NextApiRequest, res:NextApiResponse) => {

    if (req.method === 'GET') {
        await GET(req, res)
    }


}
const GET = async (req:NextApiRequest, res:NextApiResponse) => {

    const {id} = req.query;
    if(id == null) return res.status(400).json({ error: 'Invalid URL Scheme' });


    const conn = await getConnection();

    try {
        const query = `SELECT * FROM su_mods WHERE mod_id = '${id}';` ;
        const [data] = await conn.execute(query) as Array<any>;
        if (data == null || data.length == 0) return res.status(404).json({ error: 'Mod not found' });

        res.status(200).json({ data: data[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}

export default handler