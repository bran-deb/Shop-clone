import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { jwt } from '../../utilities';



export async function middleware(req: NextRequest, ev: NextFetchEvent) {

    const { token = '' } = req.cookies;

    // return new Response('No autorizado', {
    //     status: 401
    // });

    try {
        // await jwt.isValidToken(token);   //NOTE: trae algunos errores
        if (token.length >= 10) {
            return NextResponse.next();
        }

    } catch (error) {

        // return Response.redirect('/auth/login');
        const requestedPage = req.page.name;
        return Response.redirect(`/auth/login?p=${requestedPage}`);
    }

}