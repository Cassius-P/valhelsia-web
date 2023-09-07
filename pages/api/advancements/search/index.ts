import {NextApiRequest, NextApiResponse} from "next";
import {Achievement, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient({
  log: [{
      emit: 'event',
      level: 'query',
  },],
});

prisma.$on('query', (e) => {
    console.log(`Query: ${e.query}`);
    console.log(`Parameters: ${e.params}`);
});

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
    if(req.method === 'GET') {
        return await GET(req, res);
    }
    res.status(405).json({ error: 'Method not allowed', message: 'You cannot do that' });

}

const GET = async (req:NextApiRequest, res:NextApiResponse) => {
    const query = req.query.q as string;


    if(!query) {
        return res.status(400).json({ error: 'Bad request', message: 'You must provide a query' });
    }

    console.log("Query", query);

    try {
        const achievements = await prisma.achievement.findMany({
            where: {
                title: {
                    contains: query, // Using contains for SQL's LIKE '%query%'
                },
            },
            include: {
                mods: {
                    select: {
                        mod_id: true,
                        displayName: true,
                    }
                }
            },
            orderBy: {
                title: 'asc',
            },
        }) as Achievement[];


        return res.status(200).json({ data:achievements});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}

export default handler;