import { NextApiRequest, NextApiResponse } from "next";
import { getConnection } from "@/helpers/DBHelper";

interface PlayerAchievement {
    playerUUID: string;
    advancementId: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        await handlePOST(req, res);
    } else {
        res.status(405).json({ error: "Method not allowed" }); // Handle unsupported methods
    }
};

const parseRequestBody = (body: any): PlayerAchievement | null => {
    let json = body;
    if (typeof body === "string") {
        json = JSON.parse(body);
    }

    const { playerUUID, advancementId } = json;
    if (typeof playerUUID === "string" && typeof advancementId === "string") {
        return { playerUUID, advancementId };
    }

    return null;
};

const insertAchievement = async (playerUUID: string, advancementId: string) => {
    const conn = await getConnection();
    try {
        await conn.beginTransaction();
        const query =
            "INSERT INTO su_player_achievements (player_uid, achievement_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE player_uid = ? ;";
        await conn.execute(query, [playerUUID, advancementId, playerUUID]);
        await conn.commit();
    } catch (error) {
        await conn.rollback(); // Roll back the transaction if an error occurs
        throw error; // Re-throw the error for the calling function to handle
    } finally {
        await conn.end(); // Always close the connection
    }
};

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
    const parsedBody = parseRequestBody(req.body);

    if (!parsedBody) {
        return res.status(400).json({ error: "Invalid body" });
    }

    try {
        const { playerUUID, advancementId } = parsedBody;
        await insertAchievement(playerUUID, advancementId);
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error inserting achievement:", error);
        return res.status(500).json({ error: "An error occurred" });
    }
};

export default handler;