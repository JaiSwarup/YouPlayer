import { auth as getSession } from '@/lib/auth'
import { google } from 'googleapis'

export async function getPlaylists(){
    try {
        const session = await getSession();
        if (!session) {
            return null
        }
        // console.log(session)
        const access_token = (session as any).access_token;
        

        const auth = new google.auth.OAuth2();
        auth.setCredentials({access_token});

        const youtube = google.youtube('v3');

        const response = await youtube.playlists.list({
            auth,
            part: ["snippet", "contentDetails", "status"],
            mine: true,
            maxResults: 50, // Fetch up to 50 playlists
          });
      
        const playlists = response?.data?.items || [];
        // const enrichedPlaylists = await Promise.all(
        //   playlists.map(async (playlist) => {
        //     const detailsResponse = await youtube.playlistItems.list({
        //       auth,
        //       part: ["snippet"],
        //       playlistId: playlist.id!,
        //       maxResults: 1, // Fetch at least one video to get a count
        //     });
        //     // console.log(`\n ~ playlists.map ~ details :- `, details?.data?.items[0]);
        //     const details = detailsResponse?.data?.items || [];
        //     const videoCount = playlist.contentDetails?.itemCount || 0;
        //     const privacyStatus = playlist.status?.privacyStatus || "unknown"; // Privacy status: public, private, unlisted
    
        //     return {
        //       ...playlist,
        //       snippet: {
        //         ...playlist.snippet,
        //         videoCount,
        //         privacyStatus,
        //       },
        //       details,
        //     };
        //   }),
        // );
        // console.log(`\n ~ GET ~ enrichedPlaylists :- `, enrichedPlaylists);

        return playlists;
        // return new Response(JSON.stringify(enrichedPlaylists), { status: 200 });
    } catch(error :any) {
        console.log(error);
        return null
    }
}