import React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
function Home() {
    // <div className="navbar">
    //   <a href="/">Home</a>
    //   {/* <a href="/overview">Overview</a>
    //   <a href="/analytics">Analytics</a> */}
    //   {/* <a href="/reports">Reports</a> */}
    //   <a href="/transactions">Transactions</a>
    //   <a href="/settings">Settings</a>
    //   <a href="/profile">Profile</a>
    //   <a href="/notifications">Notifications</a>
    //   {/* <a href="/messages">Messages</a> */}
    //   {/* <a href="/calendar">Calendar</a> */}
    //   {/* <a href="/search">Search</a> */}
    //   <a href="/upload">Upload</a>
    //   {/* <a href="/feedback">Feedback</a> */}
    //   <a href="/logout">Logout</a>
    // </div>
    const [open, setOpen] = React.useState<boolean>(false)
    let display: string = 'inline-block'
    const toggleMenu = () => {
        setOpen(!open)
        if(open){
            display = 'none'
        } else {
            display = 'inline-block'
        }
    }
    let lol = 1000
    const transactions = [
        { amount: 1000, date: "2023-10-13", company: "Company A" },
        { amount: 1500, date: "2023-10-14", company: "Company B" },
        { amount: 800, date: "2023-10-15", company: "Company C" }
    ]
  return (
    <>
    <div className={`hamburger-icon ${display}`} onClick={toggleMenu}>
        ☰
      </div>
      {open && (
        <div className="menu-items">
          {/* Your navigation bar items go here */}
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </div>
      )}

    
    </>
  )
}

export default Home
