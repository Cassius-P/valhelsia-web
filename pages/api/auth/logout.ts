import type { NextApiRequest, NextApiResponse } from 'next';
import {setAuthCookie} from "@/libs/Auth";



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    setAuthCookie(res, "", true)

    return res.status(200).json({ success: true });
};

export default handler;
