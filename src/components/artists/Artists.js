import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { BottomScrollListener } from 'react-bottom-scroll-listener';

function Artists() {
    useEffect(() => {
        getArtists();
    }, [])


    const [artists, setArtists] = useState([]);
    const [numbersToLoad, setNumbersToLoad] = useState(0);

    const getArtists = (startNumber = 0) => {
        fetch("http://localhost:3000/artists?_start=" + startNumber + "&_limit=100")
            .then(res => {
                return res.json()
            })
            .then((data) => {
                setArtists(artists.concat(data));
            })
    }

    const history = useHistory();

    const setRoute = (id) => {
        history.push("artists/" + id);
    }


    const handleSearch = (value) => {
        if (value !== "") {
            fetch("http://localhost:3000/artists?q=" + value)
                .then(res => {
                    return res.json()
                })
                .then((data) => {
                    setArtists(data);
                })
        } else {
            getArtists();
        }

    }

    const handleBottom = () => {
        setNumbersToLoad(numbersToLoad + 100)
        getArtists(numbersToLoad);
    }



    return (
        <>
            <div>
                <h1>Artists!</h1>
                <input onChange={(e) => handleSearch(e.target.value)} placeholder={"search your favourite aritst!"}></input>
                <BottomScrollListener onBottom={() => handleBottom()}>
                    <div className="artists">
                        {
                            artists && artists.map(artist => {
                                return <div className="artist" id={artist.id} onClick={() => setRoute(artist.id)} key={artist.id}>{artist.name}</div>
                            }
                            )
                        }
                    </div>
                </BottomScrollListener>


            </div>
            <div className="loading-more">Loading more artists....</div>

        </>
    )
}
export default Artists;