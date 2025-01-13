import { auth as getSession } from '@/lib/auth'
import { google } from 'googleapis'
import { NextResponse } from 'next/server';

export async function GET(req: Request){
    try {
        const session = await getSession();
        if (!session) {
            return new NextResponse("Unauthorized Request", {status : 400});
        }
        console.log(session)
        const access_token = (session as any).access_token;
        

        const auth = new google.auth.OAuth2();
        auth.setCredentials({access_token});

        const youtube = google.youtube('v3');

        const response = await youtube.channels.list({
            auth,
            part: ["snippet", "contentDetails", "status"],
            mine: true,
            maxResults: 50, // Fetch up to 50 playlists
        });
        
        console.log(response)
    
        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch(error :any) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}