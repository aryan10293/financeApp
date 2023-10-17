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
    const toggleMenu = () => {
        setOpen(!open)
    }
    let lol = 1000
    const transactions = [
        { amount: 1000, date: "2023-10-13", company: "Company A" },
        { amount: 1500, date: "2023-10-14", company: "Company B" },
        { amount: 800, date: "2023-10-15", company: "Company C" }
    ]
  return (
    <>
    <div className={`hamburger-icon`}  style={{ display: open ? 'none' : 'inline-block' }} onClick={toggleMenu}>
        ☰
      </div>
      {open && (
        <div>X</div>
      )}
      {open && (
        <div className="menu-items">
          {/* Your navigation bar items go here */}
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </div>
      )}

    
    </>
  )
}

export default Home
