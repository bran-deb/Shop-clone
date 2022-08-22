import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
// import { jwt } from '../../utils';


export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {

    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!session) {
        const url = req.nextUrl.clone();
        url.pathname = '/auth/login';
        url.search = `p=${req.page.name}`;
        return NextResponse.redirect(url);
    }

    const validRoles = ['admin', 'super-user', 'SEO'];

    if (validRoles.includes(session.user.role)) {
        return NextResponse.redirect('/')
    }

    return NextResponse.next();
}