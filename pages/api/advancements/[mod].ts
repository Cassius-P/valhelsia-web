import {NextApiRequest, NextApiResponse} from "next";
import {getConnection} from "@/helpers/DBHelper";

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
    if(req.method === 'GET') {
        return await GET(req, res);
    }
    res.status(405).json({ error: 'Method not allowed', message: 'You cannot do that' });

}

const GET = async (req:NextApiRequest, res:NextApiResponse) => {
    const {mod} = req.query;

    const conn = await getConnection();

    try {
        const query = `SELECT 
                                a.*,
                                CASE 
                                    WHEN COUNT(su_players.uid) = 0 THEN '[]'
                                    ELSE CONCAT('[', 
                                        GROUP_CONCAT(
                                            CONCAT(
                                                '{\"player_uid\":\"', su_players.uid, 
                                                '\", \"player_name\":\"', su_players.name, '\"}'
                                            )
                                        ), 
                                        ']'
                                    )
                                END AS players
                            FROM 
                                su_achievements as a
                            LEFT JOIN 
                                su_player_achievements ON a.id = su_player_achievements.achievement_id
                            LEFT JOIN 
                                su_players ON su_player_achievements.player_uid = su_players.uid
                            WHERE 
                                a.mod_id = '${mod}'
                            GROUP BY 
                                a.id;` ;



        const [rows] = await conn.execute(query);
        conn.end()
        return res.status(200).json({ data : rows as Advancement[] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}

export default handler;