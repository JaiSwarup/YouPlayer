// import { NextApiRequest, NextApiResponse } from 'next';
// import { getServerSession } from 'next-auth';
// import { google } from 'googleapis';

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//     const session = await getServerSession({ req });

//     if (!session) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const {accessToken} = session;

//     try {
//         const response = await axios.get('https://www.googleapis.com/youtube/v3/playlists', {
//             params: {
//                 part: 'snippet,contentDetails',
//                 mine: 'true',
//             },
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });

//         const playlists = response.data.items;
//         res.status(200).json(playlists);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching playlists', error: error.message });
//     }
// };

// export default handler;