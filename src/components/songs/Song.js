import React, { useState } from 'react'

function Song(props) {

    const addToPlaylist = (playlistId, song) => {
        fetch("http://localhost:3000/playlists/" + playlistId)
            .then(res => {
                return res.json()
            })
            .then((initialData) => {
                let data = initialData;
                data.songs.push(song.id)
                fetch(`http://localhost:3000/playlists/${playlistId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ ...data })
                })
            })
    }

    // const removeFromPlaylist = (song) => {
    //     //too bad
    // }

    let selectOptions;
    if (props.playlists) {
        selectOptions = props.playlists.map((playlist) => <option key={playlist.id} value={playlist.id}>{playlist.name}</option>)
    }
    const [selectValue, setSelectValue] = useState(null);
    const setSelect = (value) => {
        setSelectValue(value)
    }

    return (
        <div className="song">
            <div className="name">
                {props.song.name}
            </div>
            <div className="album">
                {props.song.album}
            </div>
            <div className="band">
                {props.song.artist}
            </div>
            <div className="year">
                {props.song.year}
            </div>
            {selectOptions ?
                <div className="actions">
                    <select onChange={(e) => setSelect(e.target.value)}>
                        <option value="0">Add to playlist</option>
                        {selectOptions}
                    </select>
                    <button onClick={() => addToPlaylist(selectValue, props.song)}>Add</button>
                    {/* <button onClick={() => removeFromPlaylist(props.song)}>X</button> */}
                </div> : null}
            <br />
            <br />
        </div >
    )
}
export default Song;