import React from 'react'
import { Fragment } from 'react'
import Nav from './Nav'
function Home() {
  const [userData, setUserData] = React.useState<any[]>([])
    const handleThis = async (e:any) => {
      e.preventDefault()
      try {
        const reg = await fetch(`http://localhost:2014/getuser/${localStorage.getItem('token')}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
        })
        const data = await reg.json()
        console.log(data)
        if(data.success){
          setUserData(data.userinfo)
          alert(data.message)
          console.log(userData)
        }
        } catch(err) {
            console.error(err)
        }
    }
  return (
    <>
    <Nav page='home'/>


    <h1 className="bg-money-green text-white">
      This is a money green background.
    </h1>
        <button onClick={handleThis}>click me please</button>
    </>
  )
}

export default Home
