import React, { useEffect, useState } from 'react'
import Song from "./Song"
import { BottomScrollListener } from 'react-bottom-scroll-listener';

function Songs() {

    useEffect(() => {
        getPlaylists();
        getSongs();
    }, [])

    const getPlaylists = () => {
        fetch("http://localhost:3000/playlists/")
            .then(res => {
                return res.json()
            })
            .then((data) => {
                setPlaylists(data);
            })
    }

    const getSongs = () => {
        fetch("http://localhost:3000/songs?_start=" + numbersToLoad + "&_limit=100")
            .then(res => {
                return res.json()
            })
            .then((data) => {
                setSongs(songs.concat(data));
            })
    }

    const handleBottom = () => {
        setNumbersToLoad(numbersToLoad + 100)
        getSongs();
    }

    const [songs, setSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [numbersToLoad, setNumbersToLoad] = useState(0);




    return (
        <>
            <BottomScrollListener onBottom={() => handleBottom()}>
                <div class="songs-wrapper">
                    <h1>Songs!</h1>
                    <div>
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
                            <div>Error loading</div>
                        }
                    </div>
                    <div className="loading-more">Loading more songs....</div>
                </div>
            </BottomScrollListener>

            {/* <div>{playlists.map((playlist) => <div>{playlist.name}</div>)}</div> */}
        </>
    )
}
export default Songs;