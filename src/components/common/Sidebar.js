import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import logo from '../../assets/img/logo.png';

function Sidebar() {

    useEffect(() => {
        getPlaylists();
    }, [])


    const history = useHistory();

    const setRoute = (route) => {
        history.push(route)
    }

    const getPlaylists = () => {
        fetch("http://localhost:3000/playlists/")
            .then(res => {
                return res.json()
            })
            .then((data) => {
                setPlaylists(data);
            })
    }

    const addPlaylist = (inputValue) => {
        fetch("http://localhost:3000/playlists/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: inputValue, songs: [] })
        }).then(() => {
            setInputValue("");
            getPlaylists();
        })
    }

    const [playlists, setPlaylists] = useState(null);
    const [inputValue, setInputValue] = useState("");



    return (
        <div className="sidebar-wrapper">
            <div className="sidebar">
                <div className="logo">
                    <img onClick={() => setRoute("/")} src={logo} alt="Logo" />
                </div>
                <button onClick={() => setRoute("/artists")}>
                    Artiesten
            </button>
                <hr />
                <button onClick={() => setRoute("/songs")}>
                    Bibliotheek
                </button>
                <hr />
                <div className="playlists">
                    {playlists && playlists.map(playlist => {
                        return <div className="playlist-name" key={playlist.id} onClick={() => setRoute(`/playlists/` + playlist.id)}>{playlist.name}</div>
                    }
                    )}
                    <div className="add">
                        <input placeholder={"Playlist name"} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                        <button onClick={() => addPlaylist(inputValue)}>Add playlist</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Sidebar;