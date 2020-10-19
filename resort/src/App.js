import React from 'react'
import './App.css'

import Home from './pages/Home'
import Rooms from './pages/SingleRoom'
import SingleRoom from './pages/SingleRoom'
import ErrorPage from './pages/ErrorPage'

function App() {
	return (
		<div className='App'>
			<Home />
			<Rooms />
			<SingleRoom />
			<ErrorPage />
		</div>
	)
}

export default App
