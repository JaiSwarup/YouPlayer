import { auth as getSession } from '@/lib/auth'
import {google} from 'googleapis'

export default async function getChannels(){
    try {
        const session = await getSession();
        if (!session) {
            return null
        }
        console.log(session)
        const access_token = (session as any).access_token;
        

        const auth = new google.auth.OAuth2();
        auth.setCredentials({access_token});

        const youtube = google.youtube('v3');

        const response = await youtube.channels.list({
            auth,
            part: ["snippet", "contentDetails", "id"],
            mine: true,
            maxResults: 50, // Fetch up to 50 playlists
        });
        
        console.log(response)
    
        
    } catch(error :any) {
        console.log(error);
        return null
    }
}