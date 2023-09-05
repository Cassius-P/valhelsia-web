import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { NextApiResponse } from 'next';

interface UserPayload {
    id: number;
    email: string;
}

export const generateJWT = (user: UserPayload): string => {
    return jwt.sign(user, process.env.JWT_SECRET!, {
        expiresIn: '1h',
    });
};

export const setAuthCookie = (res: NextApiResponse, token: string): void => {
    res.setHeader(
        'Set-Cookie',
        serialize(process.env.COOKIE_NAME!, token, {
            httpOnly: false,
            secure: true,
            sameSite: 'lax',
            maxAge: 3600 * 24 * 7,
            path: '/',
        })
    );
};
