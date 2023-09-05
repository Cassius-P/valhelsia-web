import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';


const COOKIE_NAME = process.env.COOKIE_NAME!;
const JWT_SECRET = process.env.JWT_SECRET!;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if(COOKIE_NAME === undefined || JWT_SECRET === undefined) {
        console.log("COOKIE_NAME or JWT_SECRET is undefined");
        return res.status(500).json({ error: 'Internal server error' });
    }

    // Extract token from cookies
    const token = req.cookies[COOKIE_NAME];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        console.log("decoded", decoded);



        res.status(200).json({ status: "connected" });
    } catch (err) {
        res.status(401).json({ error: 'Token is either invalid or expired' });
    }
}
