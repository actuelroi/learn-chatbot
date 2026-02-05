
import db from "@/db/client";
import scaleKit from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

import { user as User} from '@/db/schema'
import { eq } from "drizzle-orm";


export async function GET(req: NextRequest) {

    const { searchParams } = req.nextUrl;

    const code = searchParams.get('code');

    const error = searchParams.get('error')

    const error_description = searchParams.get('error_description');

    if (error) {
        return NextResponse.json({ error, error_description }, { status: 401 })
    }
    if (!code) {
        return NextResponse.json({ error: "No code provided" }, { status: 400 })
    }

    try {
        const redirectUri = process.env.SCALEKIT_REDIRECT_URL!;
        const authResult = await scaleKit.authenticateWithCode(code, redirectUri);

        const { user, idToken } = authResult;

        const claims = await scaleKit.validateToken(idToken);

        const organizationId =
            (claims as any).organization_id ||
            (claims as any).org_id ||
            (claims as any).oid ||
            null;

        if (!organizationId) {
            return NextResponse.json(
                { error: "No organization id found in token claims" },
                { status: 500 }
            )
        }

        const existingUser = await db.select().from(User)
                            .where(
                                eq(User.email, user.email)
                            )

        if (existingUser.length === 0){
            await db.insert(User)
            .values({
                name: user?.name || "anonymous user",
                organization_id: organizationId,
                email: user.email
            })
        }

        const response = NextResponse.redirect(new URL('/', req.url));

        const userSession = {
            email : user.email,
            organization_id: organizationId
        };

       response.cookies.set('user_session', JSON.stringify(userSession),{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60* 24 * 7
       })

       return response

    } catch (error) {
         console.log('Error exchanging code', error);
         return NextResponse.json(
            {error: "Failed to authenticate"},
            {status: 500},
         )
    }


}