import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import {generateJWT, setAuthCookie} from "@/libs/Auth";

const prisma = new PrismaClient();
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { email },
    });


    if (!user) {
        return res.status(401).json({ error: 'Invalid login credentials' });
    }

    console.log("user", user.password)

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return res.status(401).json({ error: 'Invalid login credentials' });
    }

    const token = generateJWT({ id: user.id, email: user.email });
    setAuthCookie(res, token, false);

    return res.status(200).json({ success: true });
};

export default handler;
