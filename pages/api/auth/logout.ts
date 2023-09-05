import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

const COOKIE_NAME = process.env.COOKIE_NAME!;
const JWT_SECRET = process.env.JWT_SECRET!;


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    res.setHeader(
        'Set-Cookie',
        serialize(COOKIE_NAME, '', {
            maxAge: 0,
            path: '/',
        })
    );

    return res.status(200).json({ success: true });
};

export default handler;
