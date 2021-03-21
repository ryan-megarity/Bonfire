import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { TrackSearchResult } from "./TrackSearchResult";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "8b945ef10ea24755b83ac50cede405a0",
});

export const Search = ({ setTrackUri, accessToken }: any) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const addToQueue = (track: any) => {
    //setTrackUri(track.uri);
    spotifyApi.addToQueue(track.uri);
    setSearch("");
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) {
      setSearchResults([]);
      return;
    }
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res: any) => {
      console.log("here");
      if (cancel) {
        console.log("here3");
        return;
      }
      console.log("here2");
      setSearchResults(
        res.body.tracks.items.map(
          (track: {
            album: { images: any[] };
            artists: { name: any }[];
            name: any;
            uri: any;
          }) => {
            const smallestAlbumImage = track.album.images.reduce(
              (smallest: { height: number }, image: { height: number }) => {
                if (image.height < smallest.height) return image;
                return smallest;
              },
              track.album.images[0]
            );
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
            };
          }
        )
      );
    });
  }, [search, accessToken]);

  return (
    <div>
      <h4>Add to Queue</h4>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map((track: any) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            addToQueue={addToQueue}
          />
        ))}
      </div>
    </div>
  );
};
