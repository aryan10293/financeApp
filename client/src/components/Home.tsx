import React from 'react'
import { Fragment } from 'react'
import Nav from './Nav'
function Home() {
  const [userData, setUserData] = React.useState<any[]>([])

  return (
    <>
    <Nav page='home'/>


    <h1 className="bg-money-green text-white">
      This is a money green background.
    </h1>
    </>
  )
}

export default Home
