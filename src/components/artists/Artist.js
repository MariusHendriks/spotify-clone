import React, { useEffect, useState } from 'react';
import Song from "../songs/Song"

function Artist(props) {
    useEffect(() => {
        getPlaylists();
        let artistName;
        fetch(`http://localhost:3000/artists/${props.id}`)
            .then(res => {
                return res.json()
            })
            .then((data) => {
                artistName = data.name;
                setArtist(data);

                fetch(`http://localhost:3000/songs?artist=${artistName}`)

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
    const [artist, setArtist] = useState(null);
    const [songs, setSongs] = useState(null);
    if (artist) {
        return (
            <div className="artist">
                <h1>{artist.name}</h1>
                <h2>Songs</h2>
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
                    <div>Loading...</div>
                }

            </div>
        );
    } else {
        return (
            <div>Loading artist...</div>
        )
    }
}

export default Artist;