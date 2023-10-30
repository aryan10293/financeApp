import React from 'react'
import { Fragment } from 'react'
import Nav from './Nav'
function Transactions() {
  const [time, setTime] = React.useState<string>('Daily')
  const [data, setData] = React.useState<any>([]) // change that any into a interface for type strictness
  const [merchant, setMercant] = React.useState<string>('')
  const [category, setCategory] = React.useState<string>('Housing')
  const [cost, setCost] = React.useState<string>('208.54')
  const [userId, setUserId] = React.useState<string>('1234567654323456')
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
    <section className="bg-gray-50">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-green-900 md:text-2xl">
            Made A Transaction?
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={Trans}>
              <div>
                <label htmlFor="merchant" className="block mb-2 text-sm font-medium text-gray-900">Merchant</label>
                <input
                  type="name"
                  id="merchant"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Footlocker"
                  required
                  value={merchant}
                  onChange={(e) => {
                    setMercant(e.target.value)
                  }}
                />
              </div>
              <div>
                <label htmlFor="cost" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                <input
                  type="name"
                  id="cost"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="$10"
                  required
                  value={`${cost}`}
                  onChange={(e) => {
                    setCost(e.target.value)
                  }}
                />
              </div>
              <div>
                 <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Select Category</label>
                <select  onChange={(e) => setCategory(e.target.value)}>
                {spendingCategories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
                </select>
              </div>
              <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                Post Transaction
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
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
