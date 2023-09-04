import {NextApiRequest, NextApiResponse} from "next";
import {getConnection} from "@/helpers/DBHelper";
import {AdvancementTree} from "@/models/AdvancementTree";

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
    if(req.method === 'GET') {
        return await GET(req, res);
    }
    res.status(405).json({ error: 'Method not allowed', message: 'You cannot do that' });

}

const GET = async (req:NextApiRequest, res:NextApiResponse) => {
    const {query} = req.query;
    if(!query) {
        return res.status(400).json({ error: 'Bad request', message: 'You must provide a query' });
    }
    const conn = await getConnection();



    try {
        const SQLQuery = `SELECT a.*, m.displayName as mod_name FROM su_achievements as a
                            LEFT JOIN su_mods as m ON a.mod_id = m.mod_id
                            WHERE a.title like '%${query}%'
                            ORDER BY a.title ASC;` ;

        const [rows] = await conn.execute(SQLQuery);

        conn.end()
        return res.status(200).json({ data : rows as Advancement[] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}

export default handler;