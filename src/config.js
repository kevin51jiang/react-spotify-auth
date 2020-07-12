import { Scopes } from "react-spotify-auth";

export const authEndpoint = "https://accounts.spotify.com/authorize";

export const clientId = "316e898df20d4a0d8c486499c9dc7abf";
export const redirectUri = "http://localhost:3000/redirect";

export const scopes = [
  Scopes.userTopRead,
  Scopes.userReadCurrentlyPlaying,
  Scopes.userModifyPlaybackState,
];

export const barUpdateincrement = 500; // time between progressbar updates (ms)
export const infoUpdateIncrement = 7000; // time between every poll to Spotify server (ms)
