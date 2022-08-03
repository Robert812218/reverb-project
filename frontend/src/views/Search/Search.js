// import React, { useEffect, useState } from 'react';
// import useAuth from './useAuth';

// import TrackSearchResult from './TrackSearchResult';
// import Player from './Player';

// import { Container, Form, } from 'react-bootstrap';
// import SpotifyWebApi from 'spotify-web-api-node';

// const spotifyApi = new SpotifyWebApi({
//   clientId: "ea696b669de04879856700d07e3f9ac0",
// })

// export default function Search({ code }) {
//   const accessToken = useAuth(code);
//   const [search, setSearch] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [playingTrack, setPlayingTrack] = useState();

//   function chooseTrack(track) {
//     setPlayingTrack(track);
//     setSearch("");
//   }

//   useEffect(() => {
//     if (!accessToken) return
//     spotifyApi.setAccessToken(accessToken);
//   }, [accessToken])

//   useEffect(() => {
//     if (!search) return setSearchResults([])
//     if (!accessToken) return

//     let cancel = false;
//     spotifyApi.searchTracks(search).then(res => {
//       if (cancel) return
//       setSearchResults(res.body.tracks.items.map(track => {
//         const smallestAlbumImage = track.album.images.reduce(
//           (smallest, image) => {
//             if (image.height < smallest.height) return image
//             return smallest
//           }, track.album.images[0])

//         return {
//           artist: track.artists[0].name,
//           title: track.name,
//           uri: track.uri,
//           albumUrl: smallestAlbumImage.url
//         }
//       }))
//     })

//     return () => cancel = true;
//   }, [search, accessToken])

//   return (
//     <Container className='d-flex flex-column py-2' style={{
//       height: "100vh"
//     }}>
//       <Form.Control
//         type='search'
//         placeholder='Search Songs/Artists'
//         value={search}
//         onChange={e => setSearch(e.target.value)}
//       />
//       <div className='flex-grow-1 my-2' style={{ overflowY: 'auto' }}>
//         {searchResults.map(track => (
//           <TrackSearchResult track={track} key={track.uri} chooseTrack=
//           {chooseTrack}/>
//         ))}
//       </div>
//       <div><Player accessToken={accessToken} trackUri={playingTrack?.uri} /></div>
//     </Container>
//   )
// }
