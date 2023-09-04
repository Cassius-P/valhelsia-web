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

const  buildAdvancementTree = (advancements: Advancement[]) => {
    const map: { [key: string]: AdvancementTree } = {};

    // Create a map of AdvancementTree objects and initialize children arrays
    advancements.forEach(advancement => {
        map[advancement.id] = {
            name: advancement.title,
            id: advancement.id,
            attributes: {
                description: advancement.description,
                icon: advancement.icon,
                modId: advancement.mod_id,
                parent_id: advancement.parent_id,
                players: advancement.players.length > 0 ? JSON.parse(advancement.players.toString()) : []
            }
        };
    });

    // Build the tree structure by linking children to their parents
    const roots: AdvancementTree[] = [];
    advancements.forEach(advancement => {
        const node = map[advancement.id];
        if (advancement.parent_id && map[advancement.parent_id]) {
            const parent = map[advancement.parent_id];
            parent.children = parent.children || [];
            parent.children.push(node);
        } else {
            roots.push(node);
        }
    });

    return roots;
}

export default handler;