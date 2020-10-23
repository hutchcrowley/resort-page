import React, { Component } from 'react'
import items from './data'

const RoomContext = React.createContext()
// creates a new context object to hold room data
// <RoomContext.Provider value={'hello}

export default class RoomProvider extends Component {
	state = {
		rooms: [],
		sortedRooms: [],
		featuredRooms: [],
		loading: true,
	}
	// getData
	componentDidMount() {
		// variable rooms stores the retrieved and formatted room data from back end
		let rooms = this.formatData(items)
		console.log(rooms)
		// storing only the featured rooms to allow users to filter results
		let featuredRooms = rooms.filter(room => room.featured === true)
		this.setState({
			rooms,
			featuredRooms,
			sortedRooms: rooms,
			loading: false,
		})
	}

	// function to take deeply nested raw data from back end and format it for ease of use
	formatData(items) {
		let tempItems = items.map(item => {
			// storing the id for each item in its own variable
			let id = item.sys.id
			// map over the images array and return the image urls
			let images = item.fields.images.map(image => image.fields.file.url)
			// using spread operator to create a new room object with a simplified format
			let room = { ...item.fields, images, id }
			// return the new room object
			return room
		})
		return tempItems
	}

	getRoom = slug => {
		let tempRooms = [ ...this.state.rooms ]
		const room = tempRooms.find(room => room.slug === slug)
		console.log(room)
		return room
	}

	render() {
		return (
			<RoomContext.Provider
				value={{
					...this.state,
					getRoom: this.getRoom,
				}}
			>
				{this.props.children}
			</RoomContext.Provider>
		)
	}
}

const RoomConsumer = RoomContext.Consumer

export { RoomProvider, RoomConsumer, RoomContext }
