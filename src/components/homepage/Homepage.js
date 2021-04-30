import React from 'react'
import { useHistory } from 'react-router-dom';

function Homepage() {

    const history = useHistory();

    const handleLink = (linkTo) => {
        history.push(linkTo);
    }

    return (
        <div>
            <h1>Hello!</h1>
            <div>
                <h2>Browse songs or artists!, or make a playlist in the sidebar!</h2>
                <button className="" onClick={() => handleLink("songs")}>Songs</button>
                <button className="homepage-button" onClick={() => handleLink("artists")}>Artists</button>
            </div>
        </div >
    )
}
export default Homepage;