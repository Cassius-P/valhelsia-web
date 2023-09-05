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
    const { id } = req.query;

    if(id == null) {
        return res.status(400).json({ error: 'Invalid URL Scheme' });
    }

    try {
        const mod = await prisma.mod.findUnique({
            where: {
                mod_id: id as string,
            },
        });

        if (!mod) {
            return res.status(404).json({ error: 'Mod not found' });
        }

        return res.status(200).json({ data: mod });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}

export default handler;
