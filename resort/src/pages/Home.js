import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'

const Home = () => {
	return (
		<Hero>
			<Banner title='luxurious rooms' subtitle='deluxe rooms starting at $299' />
		</Hero>
	)
}

Hero.defaultProps = {
	hero: 'defaultHero',
}

export default Home
