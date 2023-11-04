import React from 'react'
import { Fragment } from 'react'
import Nav from './Nav'
function Transactions() {
  const [time, setTime] = React.useState<string>('Daily')
  const [data, setData] = React.useState<any>([]) // change that any into a interface for type strictness
  const [merchant, setMercant] = React.useState<string>('')
  const [category, setCategory] = React.useState<string>('Housing')
  const [cost, setCost] = React.useState<string>('208.54')
  const userId =  '1234567654323456'
  const spendingCategories = [
      'Housing',
      'Transportation',
      'Food',
      'Utilities',
      'Healthcare',
      'Debt Payments',
      'Savings',
      'Entertainment',
      'Personal Care',
      'Education'
    ];
    const Trans = async (e:any) => {
        e.preventDefault()
         try {
        const reg = await fetch('http://localhost:2014/posttransaction',{
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
            body: JSON.stringify({
            cost: cost,
            category: category,
            merchant: merchant,
            userId: userId,
            date: Date.now()
          }),
        })
        const lol = await reg.json()
        setData([...data, lol])
        console.log(lol)
        console.log(category)
        setMercant('')
        setCost('')
        } catch(err) {
            console.error(err)
        }
      }
  React.useEffect( () => {
    async function fetchData (){
      try {
        const getTransData = await fetch(`http://localhost:2014/gettransactions/${userId}/${time}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
          })

        const info = await getTransData.json()
        console.log(info)
        setData(info)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
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
      {data.map((x:any) => {
        return (
          <div className="transaction">
      <div className="transaction-info">
        <div className="transaction-date">{x.date}</div>
        <div className="transaction-category">{x.category}</div>
      </div>
      <div className="transaction-description">{x.merchant}</div>
      <div className="transaction-amount">{x.cost}</div>
    </div>
        )
      })}
    </>
  )
}

export default Transactions
