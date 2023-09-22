'use client'
import React from 'react'
import Link from 'next/link'
import { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';



const page = () => {


const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const router = useRouter();



useEffect(() => {
  

  if(localStorage.getItem('token'))
{

  router.push('/')

}


},[])


const handleChange=(e)=>{

  if(e.target.name==='email')
  {
    setEmail(e.target.value)
  }
  else if(e.target.name==='password')
  {
    setPassword(e.target.value)
  }
}



const handleSubmit= async(e)=>{

  e.preventDefault();
  
  const data={email:email,password:password}

  const datax = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  })

  let res = await datax.json();


  setEmail('')
  setPassword('')


  if(res.success)
{

  

  localStorage.setItem("token",res.token)

  toast.success('Login successfully!', {
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });


    setTimeout(() => {
      
      router.push(process.env.NEXT_PUBLIC_HOST)

    },1000);



  }
  else{

    toast.error('Invalid credentials!', {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

}


  return (

    <div className="flex min-h-screen flex-col justify-start px-6 py-20 lg:px-8">
       <ToastContainer
position="bottom-left"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="/photo3.png" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" onSubmit={handleSubmit} method="POST">
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input value={email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            <Link href={'/forgot'} className="font-semibold text-sky-600 hover:text-sky-500">Forgot password?</Link>
          </div>
        </div>
        <div className="mt-2">
          <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit"  className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Sign in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <Link href={'/signup'} className="font-semibold leading-6 text-sky-600 hover:text-sky-500"> Sign up</Link>
    </p>
  </div>
</div>

    )
}

export default page