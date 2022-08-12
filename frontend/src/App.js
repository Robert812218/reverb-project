import React, { Component, useState, useEffect } from 'react';
import './App.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SpotifyWebApi from "spotify-web-api-js";
// import Footer from './components/footer/Footer';
// import Sidebar from './views/sidebar/Sidebar'
import { getTokenFromResponse } from "./views/Login/spotify";
import { UseDataLayerValue } from './DataLayer';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FavoriteIcon from '@mui/icons-material/Favorite';

import "bootstrap/dist/css/bootstrap.min.css";
import Home from './views/Home/Home';
import Search from './views/Search/Search';
import "./views/Search/Search.css";
import "./views/Library/library.css"
import "./views/NewSidebar/NewSidebar.css"
import Login from './views/Login/Login';
import "./views/Login/Login.css"
import Player from './views/Dashboard/Player';

import CreatePlaylists from './views/Library/PlaylistComponents/CreatePlaylists';


const spotify = new SpotifyWebApi();

function App() {
  const [view, setView] = useState("Home");
  const [searchResult, setSearchResult] = useState("");
  const [{ user, recents, playlists, token, featured, releases, playingTrack, search }, dispatch] = UseDataLayerValue();

  const featuredTracks = ["0SuLAslEMFZAXf0SwY7syi", "6m9qPYXmhge2QhBLfFKnVF", "2U5WueTLIK5WJLD7mvDODv", "1XdbvPWz4lhyRBMz9cBy8b", "09IOPhEh1OMe0HD9b36FJk", "0qtK3XwbuG153dmwB8iepL"];
  const songsOfSummer = ["5fXhZxEgItsbLnC3AyTh2m", "0pjb349DmkGMDWlBxUw3Do", "27rshalgXksSkPe00lwaju", "6LqoPaYA72w6y0W3zEvjAV", "0UTKogJDuLLjZVsY9xZbmw", "2Xpt0PB7ARg7OAmzvwgU3P"];

  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;
    ;
    // if (hash.access_token) {
    //   window.location.hash = "";
    //   _token = hash.access_token;
    //   localStorage.setItem("_token", _token);
    // } else {
    //   _token = localStorage.getItem("_token");
    // }

    if (_token) {
      spotify.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.getMe()
        .then((user) => {
          console.log(user);
          dispatch({
            type: "SET_USER",
            user: user,
          });
        }).catch((error) => {
          console.log(error);
        });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        })
      })

      spotify.getTracks(featuredTracks)
        .then((featured) => {
          dispatch({
            type: "SET_FEATURED",
            featured: featured,
          })
        })

      spotify.getTracks(songsOfSummer)
        .then((summers) => {
          dispatch({
            type: "SET_SUMMERS",
            summers: summers,
          })
        })

      spotify.getNewReleases({ limit : 6, offset: 0, country: 'SE' })
        .then((releases) => {
          dispatch({
            type: "SET_RELEASES",
            releases: releases,
          })
        })

      spotify.searchTracks(searchResult)
        .then((search) => {
          dispatch({
            type: "SET_SEARCH",
            search: search,
          })
        })

        spotify.getMyRecentlyPlayedTracks({
          limit : 6
        })
        .then((recents) => {
          dispatch({
            type: "SET_RECENTS",
            recents: recents,
          })
        })

    }

  }, []);

  const setPlayingTrack = (track) => {
    dispatch({
      type: "SET_PLAYING_TRACK",
      track: track,
    })
  }

  console.log("TOKEN", token);
  console.log("PLAYLISTS", playlists);
  console.log("RECENTS", recents);
  console.log("FEATURED", featured);
  console.log("Search", search);
  return (
    <div className='app'>
    {token ? 
<div className='reverb'>
      <div className='sidebar'>
      <div className='sidebar-title'>
        <p>Reverb</p>
      </div>
        <div className='sidebar-items'>
          <div className='sidebar-home' onClick={() => setView("Home")}>
            <div className='sidebar-icon'>
              <HomeIcon />
            </div>
            <p>Home</p>
          </div>
          <div className='sidebar-search' onClick={() => setView("Search")}>
            <div className='sidebar-icon'>
              <SearchIcon />
            </div>
            <p>Search</p>
          </div>
          <div className='sidebar-library' onClick={() => setView("Library")}>
            <div className='sidebar-icon'>
              <LibraryMusicIcon />
            </div>
            <p>Your Library</p>
          </div>
          <div className='sidebar-playlist' onClick={() => setView("CreatePlaylists")}>
            <div className='sidebar-icon'>
              <PlaylistAddIcon />
            </div>
            <p>Create Playlist</p>
          </div>
          <div className='sidebar-liked'>
            <div className='sidebar-icon'>
              <FavoriteIcon />
            </div>
            <p>Liked Songs</p>
          </div>
        </div>

      </div>
      <div className='view'>
        {view === "Home" && <Home />}
        {view === "Search" && <Search searchResult={searchResult} setSearchResult={setSearchResult} />}
        {view === "CreatePlaylists" && <CreatePlaylists user={user} />}     
      </div>
      <div className='player-div'>
    <Player token={token} trackUri={playingTrack?.uri} />
    </div>
    </div>

: <Login/>
}
</div>
  );
}       


export default App;