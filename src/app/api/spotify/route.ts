import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

const getAccessToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token!,
    }),
  });

  return response.json();
};

const getCurrentlyPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

const getRecentlyPlayed = async () => {
  const { access_token } = await getAccessToken();

  return fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export async function GET() {
  try {
    // Try to get currently playing track first
    const currentlyPlayingResponse = await getCurrentlyPlaying();
    
    if (currentlyPlayingResponse.status === 200) {
      const data = await currentlyPlayingResponse.json();
      
      if (data && data.item) {
        return NextResponse.json({
          isPlaying: data.is_playing,
          title: data.item.name,
          artist: data.item.artists.map((artist: any) => artist.name).join(', '),
          album: data.item.album.name,
          songUrl: data.item.external_urls.spotify,
          albumImageUrl: data.item.album.images[0]?.url,
        });
      }
    }

    // If no currently playing track, get recently played
    const recentlyPlayedResponse = await getRecentlyPlayed();
    
    if (recentlyPlayedResponse.status === 200) {
      const data = await recentlyPlayedResponse.json();
      
      if (data && data.items && data.items.length > 0) {
        const track = data.items[0].track;
        return NextResponse.json({
          isPlaying: false,
          title: track.name,
          artist: track.artists.map((artist: any) => artist.name).join(', '),
          album: track.album.name,
          songUrl: track.external_urls.spotify,
          albumImageUrl: track.album.images[0]?.url,
        });
      }
    }

    // Fallback if no data available
    return NextResponse.json({
      isPlaying: false,
      title: 'Nenjukkule',
      artist: 'AR Rahman',
      album: 'Kadal',
      songUrl: '',
      albumImageUrl: '',
    });

  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    
    // Fallback data
    return NextResponse.json({
      isPlaying: false,
      title: 'Nenjukkule',
      artist: 'AR Rahman',
      album: 'Kadal',
      songUrl: '',
      albumImageUrl: '',
    });
  }
} 