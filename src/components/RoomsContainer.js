import React from 'react'
import RoomsFilter from './RoomsFilter'
import RoomList from './RoomList'
import { withRoomConsumer } from '../context'
import Loading from './Loading'

// Here are illustrated two ways of consume a context object with a functional component

// The first is using render props to pass specific values down to the components children, like so:

// export default function RoomsContainer() {
// 	return (
// 		<RoomConsumer>
// 			{value => {
// 				const { loading, sortedRooms, rooms } = value
// 				if (loading) {
// 					return <Loading />
// 				}
// 				return (
// 					<div>
// 						Hello from Rooms Container
// 						<RoomsFilter rooms={rooms} />
// 						<RoomList rooms={sortedRooms} />
// 					</div>
// 				)
// 			}}
// 		</RoomConsumer>
// 	)
// }

// The second method utilizes a higher-order component to pass the values down.

function RoomContainer ({ context }) {
  const { loading, sortedRooms, rooms } = context

  if (loading) {
    return <Loading />
  }
  return (
    <>
      <RoomsFilter rooms={rooms} />
      <RoomList rooms={sortedRooms} />
    </>
  )
}

export default withRoomConsumer(RoomContainer)
