import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Homepage from "./components/homepage/Homepage"

import Artists from "./components/artists/Artists"
import Artist from "./components/artists/Artist"

import Sidebar from "./components/common/Sidebar"
import Header from "./components/common/Header"

import Songs from "./components/songs/Songs"

import Playlist from "./components/playlists/Playlist"


import './style.scss';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/artists">
            <Artists />
          </Route>
          <Route exact path="/artists/:id" render={({ match }) => (
            <Artist id={match.params.id} />
          )} />
          <Route exact path="/songs">
            <Songs />
          </Route>
          <Route exact path="/playlists/:id" render={({ match }) => (
            <Playlist id={match.params.id} />
          )} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
