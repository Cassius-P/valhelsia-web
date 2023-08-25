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
    const {mod} = req.query;

    const conn = await getConnection();

    try {
        const query = `SELECT
    su_achievements.*,
    CASE
        WHEN COUNT(su_players.uid) = 0 THEN '[]'
        ELSE JSON_ARRAYAGG(
                JSON_OBJECT(
                        'player_uid', su_players.uid,
                        'player_name', su_players.name -- Assuming there's a name column in su_players
                    )
            )
        END AS players
FROM su_achievements
         LEFT JOIN su_player_achievements ON su_achievements.id = su_player_achievements.achievement_id
         LEFT JOIN su_players ON su_player_achievements.player_uid = su_players.uid
WHERE su_achievements.mod_id = '${mod}'
GROUP BY su_achievements.id;` ;


        const [rows] = await conn.execute(query);

        const tree = buildAdvancementTree(rows as Advancement[]);

        res.status(200).json({ data : tree });
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
            attributes: {
                description: advancement.description,
                icon: advancement.icon,
                modId: advancement.mod_id,
                parent_id: advancement.parent_id,
                players: advancement.players.length > 0 ? JSON.parse(advancement.players) : []
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