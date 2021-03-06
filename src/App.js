import React from 'react'
import './App.css'

import Home from './pages/Home'
import Rooms from './pages/Rooms'
import SingleRoom from './pages/SingleRoom'
import ErrorPage from './pages/ErrorPage'

import { Route, Switch } from 'react-router-dom'

import NavBar from './components/NavBar'

function App () {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/rooms/' component={Rooms} />
        <Route exact path='/rooms/:slug' component={SingleRoom} />
        <Route component={ErrorPage} />
      </Switch>
    </>
  )
}

export default App
