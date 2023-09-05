import {NextApiRequest, NextApiResponse} from "next";
import {Achievement, PrismaClient} from "@prisma/client";


const prisma = new PrismaClient({
  log: ['query'],
});;

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
    if(req.method === 'GET') {
        return await GET(req, res);
    }
    res.status(405).json({ error: 'Method not allowed', message: 'You cannot do that' });

}

const GET = async (req:NextApiRequest, res:NextApiResponse) => {
    const {mod} = req.query

    if (!mod) {
        return res.status(400).json({ error: 'mod parameter is required' });
    }


    try {
        const achievements: Achievement[] = await prisma.achievement.findMany({
            where: {
                mod_id: mod as string,
            },
            include: {
                players: {
                    select: {
                        player: true,
                    },
                },
            },
        });

        return res.status(200).json({ data : achievements as Achievement[] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}

export default handler;