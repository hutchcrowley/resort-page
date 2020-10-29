import React, { Component } from 'react'
// for loading data from local machine during development
// import items from './data'
import Client from './Contentful'

// consume the data from the contentful database
console.log('client in context ', Client)
const RoomContext = React.createContext()
// creates a new context object to hold room data
// <RoomContext.Provider value={'hello}

export default class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
    extras: []
  }

  // getData

  getData = async () => {
    try {
      let res = await Client.getEntries({
        content_type: 'name',
        order: 'sys.createdAt'
      })
      // variable rooms stores the retrieved and formatted room data from back end
      console.log('items on response object ', res.items)
      let rooms = this.formatData(res.items)
      console.log('rooms variable affter assignment ', rooms)
      // storing only the featured rooms to allow users to filter results
      let featuredRooms = rooms.filter(room => room.featured === true)
      let maxPrice = Math.max(...rooms.map(item => item.price))
      let maxSize = Math.max(...rooms.map(item => item.size))

      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        maxPrice,
        maxSize,
        description: rooms.description,
        extras: rooms.extras
      })
    } catch (err) {
      console.log(err)
    }
  }

  // using lifecycle method to run the getData function when the component mojnts initially
  componentDidMount () {
    // run the getData function
    this.getData()
  }

  // function to take deeply nested raw data from back end and format it for ease of use
  formatData (rooms) {
    let tempItems = rooms.map(item => {
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

  // get a single room using the slug field
  getRoom = slug => {
    let tempRooms = [...this.state.rooms]
    const room = tempRooms.find(room => room.slug === slug)
    console.log(room)
    return room
  }

  // change handler for filtering functionality
  handleChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = event.target.name
    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    )
  }

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state
    //  all the rooms
    let tempRooms = [...rooms]

    // transform value
    capacity = parseInt(capacity)

    // filter by type
    if (type !== 'all') {
      tempRooms = tempRooms.filter(room => room.type === type)
    }

    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity)
    }

    // filter by price
    tempRooms = tempRooms.filter(room => room.price <= price)

    // filter by size
    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    )

    // filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true)
    }

    // filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true)
    }

    // change state
    this.setState({
      sortedRooms: tempRooms
    })
  }

  render () {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    )
  }
}

const RoomConsumer = RoomContext.Consumer

export function withRoomConsumer (Component) {
  return function ConsumerWrapper (props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    )
  }
}

export { RoomProvider, RoomConsumer, RoomContext }
