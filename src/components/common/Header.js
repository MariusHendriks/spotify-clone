import React from 'react'
import { useHistory } from "react-router-dom"

function Header() {

    const history = useHistory();

    const setRoute = (id) => {
        history.push("/")
    }

    return (
        <div onClick={() => setRoute()} className="header">

        </div>
    )
}
export default Header;