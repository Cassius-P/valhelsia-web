import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = process.env.COOKIE_NAME!;
export default async function middleware (req: NextRequest) {

    console.log("Middleware cookies", req.cookies)


    const cookies = req.cookies;
    const cookie = cookies.get(COOKIE_NAME);

    let token = cookie?.value.toString()

    if (token == null) {
        return NextResponse.redirect(new URL('/404', req.url))
    }

    try {

        const decoded = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/verify`, {
            method: 'GET',
            headers: {
                'Cookie': `${COOKIE_NAME}=${token}`
            }
        } ).then(async res => {
            return await res.json()
        })
        if(typeof decoded === 'string') {
            return NextResponse.redirect(new URL('/404', req.url))
        }
        return NextResponse.next()
    } catch (err) {
        console.warn("JWT is invalid or expired", err)
        return NextResponse.redirect(new URL('/404', req.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/admin/:path*',
}