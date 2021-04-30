import React, { useEffect, useState } from 'react';
import Song from "../songs/Song"

function Playlist(props) {
    useEffect(() => {
        getPlaylists();
        let songIds;
        fetch(`http://localhost:3000/playlists/${+ props.id}`)
            .then(res => {
                return res.json()
            })
            .then((data) => {
                songIds = data.songs;
                setPlaylst(data);
                let idString = ""
                songIds.forEach(songId => {
                    idString += `&id=${songId}`
                });
                fetch(`http://localhost:3000/songs?id=${idString}`)

                    .then(res => {
                        return res.json()
                    })
                    .then((data) => {
                        setSongs(data);
                    })
            })
    }, [props.id])

    const getPlaylists = () => {
        fetch("http://localhost:3000/playlists/")
            .then(res => {
                return res.json()
            })
            .then((data) => {
                setPlaylists(data);
            })
    }

    const [playlists, setPlaylists] = useState([]);

    const [playlist, setPlaylst] = useState(null);
    const [songs, setSongs] = useState(null);
    if (playlist) {
        return (
            <div className="playlist">
                <h1>Songs</h1>
                <h2>{playlist.name}</h2>
                {songs !== null ?
                    <div className="songs">
                        {songs && songs.map(song => {
                            return (
                                <Song key={song.id} song={song} playlists={playlists} />
                            )
                        }
                        )}
                    </div>
                    :
                    <div>Something went wrong...</div>
                }

            </div>
        );
    } else {
        return (
            <div>
                Broken...
            </div>
        );
    }

}

export default Playlist;