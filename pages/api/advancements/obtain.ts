import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient({
  log: ['query'],
});;

interface PlayerAchievement {
    playerUUID: string;
    advancementId: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await handlePOST(req, res);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
    const parsedBody = parseRequestBody(req.body);

    if (!parsedBody) {
        return res.status(400).json({ error: 'Invalid body' });
    }

    try {
        const { playerUUID, advancementId } = parsedBody;

        await prisma.playerAch.upsert({
            where: {
                player_uid: playerUUID,
                achievement_id: advancementId,
            },
            update: {},
            create: {
                player_uid: playerUUID,
                achievement_id: advancementId,
                created_at: new Date(),
            },
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error inserting achievement:', error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};


const parseRequestBody = (body: any): PlayerAchievement | null => {
    let json = body;
    if (typeof body === 'string') {
        json = JSON.parse(body);
    }

    const { playerUUID, advancementId } = json;
    if (typeof playerUUID === 'string' && typeof advancementId === 'string') {
        return { playerUUID, advancementId };
    }

    return null;
};