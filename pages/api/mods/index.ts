import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        await GET(req, res);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const mods = await prisma.mod.findMany({
            select: {
                mod_id: true,
                displayName: true,
                description: true,
            },
            orderBy: {
                displayName: 'asc',
            },
        });

        return res.status(200).json({ data: mods });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}

export default handler;
