# Spotify API Setup Guide

Follow these steps to set up Spotify integration for your portfolio:

## 1. Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the details:
   - **App Name**: Your Portfolio Spotify
   - **App Description**: Portfolio website Spotify integration
   - **Website**: Your portfolio URL
   - **Redirect URI**: `http://localhost:3000/callback` (for development)
5. Save your app

## 2. Get Your Credentials

From your Spotify app dashboard, copy:
- **Client ID**
- **Client Secret** (click "Show Client Secret")

## 3. Get Your Refresh Token

You need to authorize your app to access your Spotify data:

1. Replace `YOUR_CLIENT_ID` and `YOUR_REDIRECT_URI` in this URL:
```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=YOUR_REDIRECT_URI&scope=user-read-currently-playing%20user-read-recently-played
```

2. Visit the URL in your browser and authorize the app
3. You'll be redirected to your redirect URI with a `code` parameter
4. Copy the code from the URL

5. Exchange the code for a refresh token using this curl command:
```bash
curl -H "Authorization: Basic <base64 encoded client_id:client_secret>" \
  -d grant_type=authorization_code \
  -d code=<your_code> \
  -d redirect_uri=<your_redirect_uri> \
  https://accounts.spotify.com/api/token
```

To get the base64 encoded credentials:
```bash
echo -n "your_client_id:your_client_secret" | base64
```

## 4. Environment Variables

Create a `.env.local` file in your project root and add:

```bash
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token_here
```

## 5. Restart Your Development Server

```bash
npm run dev
```

Your portfolio will now display your currently playing or last played Spotify track!

## Features

- Automatically fetches your currently playing song
- Falls back to your last played song if nothing is currently playing
- Updates every 30 seconds
- Displays track title and artist in the format: "Track.Artist"
- Handles errors gracefully with fallback content

## Troubleshooting

- Make sure your `.env.local` file is in the project root
- Verify all three environment variables are set correctly
- Check that your Spotify app has the correct redirect URI
- Ensure your refresh token hasn't expired (they typically last a long time) 