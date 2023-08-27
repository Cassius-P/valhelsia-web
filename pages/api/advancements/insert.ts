import {NextApiRequest, NextApiResponse} from "next";
import {getConnection, SQLQuery} from "@/helpers/DBHelper";

interface AchievementID {
    id: string;
}

const handler = async (req: NextApiRequest, res:NextApiResponse) => {

    // Post request with string array as body
    if(req.method === 'POST') {
        await handlePOST(req, res)
    }
}



const handlePOST = async (req: NextApiRequest, res:NextApiResponse) => {
    // Get body
    const body = req.body;
    // Check if body is string array
    console.log(body)
    if(Array.isArray(JSON.parse(body))) {

        const conn = await getConnection();
        await conn.beginTransaction()
        try {
            for (const item of JSON.parse(body) as Advancement[]) {
                // Insert or update logic here
                // You can use INSERT ... ON DUPLICATE KEY UPDATE if you have a unique constraint
                const query= `INSERT INTO su_achievements (id, title, description, icon, parent_id, mod_id) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id = ? ;`;

                await conn.execute(query, [item.id, item.title, item.description != null ? item.description : null, item.icon != null ? item.icon : null, item.parent != null ? item.parent : null, item.modId, item.id])

            }

            // Commit the transaction
            await conn.commit();

            res.status(200).json({ success: true });
        } catch (error) {
            // Rollback the transaction in case of an error
            await conn.rollback();

            console.error(error);
            return res.status(500).json({ error: 'An error occurred' });
        } finally {
            await conn.end();

        }
    }

    return res.status(400).json({ error: 'Invalid body' });
}


export default handler;