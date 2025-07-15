import { useState, useEffect } from 'react';

interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  songUrl: string;
  albumImageUrl: string;
}

export const useSpotify = () => {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    // Prevent multiple fetches
    if (hasFetched) return;

    const fetchSpotifyData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/spotify');
        
        if (!response.ok) {
          throw new Error('Failed to fetch Spotify data');
        }
        
        const data = await response.json();
        setTrack(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Set fallback data on error
        setTrack({
          isPlaying: false,
          title: 'Nenjukkule',
          artist: 'AR Rahman',
          album: 'Kadal',
          songUrl: '',
          albumImageUrl: '',
        });
      } finally {
        setLoading(false);
        setHasFetched(true);
      }
    };

    // Fetch only once on component mount
    fetchSpotifyData();
  }, [hasFetched]);

  return { track, loading, error };
}; 