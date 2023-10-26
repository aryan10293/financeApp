import React from 'react'
import { Fragment } from 'react'
import Nav from './Nav'
function Transactions() {
  const [time, setTime] = React.useState<string>('Daily')
  const [data, setData] = React.useState<any>({}) // change that any into a interface for type strictness
  let amount = 206
  let date = '09/23/22'
  let category = 'food'
  let description = 'chipotle'
  let cool = [1,2,3,4,5]
  React.useEffect( () => {
    async function fetchData (){
      try {
        const getTransData = await fetch('http://localhost:2014/posttransaction',{
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
          })

        const data = await getTransData.json()
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    //1234567654323456
  }, [time])
  return (
    <>
    <Nav page='transactions'/>
    <div className=" py-6 text-center">
      <h1 id='lol' className="text-4xl font-semibold">{time} Transactions</h1>
      <select name="chiil" id="idkyet" onChange={(e) => {setTime(e.target.value)}}>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
    </div>
      {cool.map(x => {
        return (
          <div className="transaction">
      <div className="transaction-info">
        <div className="transaction-date">{date}</div>
        <div className="transaction-category">{category}</div>
      </div>
      <div className="transaction-description">{description}</div>
      <div className="transaction-amount">{amount}</div>
    </div>
        )
      })}
    </>
  )
}

export default Transactions
