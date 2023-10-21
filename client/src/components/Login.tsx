import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
    const [email,setEmail] = React.useState<string>('')
    const [password,setPassword] = React.useState<string>('')
    const [name, setName] = React.useState<string>('')
    const [confirmPassword,setConfirmPassword] = React.useState<string>('')
    const handleClick = async(e: any) => {
       e.preventDefault()
        try {
        const reg = await fetch('http://localhost:2014/createaccount',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            userName: name,
            email: email,
            password: password,
            confirmPassword: password
          }),
        })
        const data = await reg.json()
        console.log(data)
        setPassword('')
        setEmail('')
        setName('')
        localStorage.setItem('token', data.token)
       // window.location.href = "/"
        } catch(err) {
            console.error(err)
        }
    }
    const holdOn = async () => {
        try {
            const reg = await fetch('http://localhost:2014/getuser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
            });

            if (reg.ok) {
            const data = await reg.json();
            console.log(data);
            } else {
            throw new Error('Failed to get data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to="#" className="flex items-center mb-6 text-2xl font-semibold text-green-900 dark:text-green">
          Drej Finance App
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-green-900 md:text-2xl dark:text-green">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleClick}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e)=> {setEmail(e.target.value)}}
                />
              </div>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                <input
                  type="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="aryan10293"
                  required
                  value={name}
                  onChange={(e)=> {setName(e.target.value)}}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={password}
                  onChange={(e)=> {setPassword(e.target.value)}}
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={confirmPassword}
                  onChange={(e)=> {setConfirmPassword(e.target.value)}}
                />
              </div>
              <button type="submit" className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <a onClick={holdOn}> A random button dont mind it</a>
    </section>
  )
}

export default Login
