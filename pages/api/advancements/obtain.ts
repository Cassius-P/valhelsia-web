import {NextApiRequest, NextApiResponse} from "next";
import {getConnection} from "@/helpers/DBHelper";

interface PlayerAchievement {
    playerUUID: string;
    advancementId: string;
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

    if(!body){
        return res.status(400).json({ error: 'Invalid body' });
    }

    try{
        let json = JSON.parse(body) as PlayerAchievement;
        let player_uid = json.playerUUID;
        let achievement_id = json.advancementId;

        const conn = await getConnection();
        await conn.beginTransaction()

        const query= `INSERT INTO su_player_achievements (player_uid, achievement_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE player_uid = ? ;`;
        await conn.execute(query, [player_uid, achievement_id, player_uid])

        return res.status(200).json({ success: true });


    }catch (error){
        return res.status(500).json({ error: 'An error occurred' });
    }

    return res.status(500).json({ error: 'Invalid body' });
}


export default handler;