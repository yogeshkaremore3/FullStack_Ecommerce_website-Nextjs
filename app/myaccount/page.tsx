'use client'
import React from 'react'
import { useEffect,useState } from 'react'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { cartContext } from '../context/CartProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function page() {

  const router = useRouter()
  const {setProgress} = useContext(cartContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [password, setPassword] = useState('')
  const [npassword, setnPassword] = useState('')
  const [cpassword, setcPassword] = useState('')


  useEffect(() => {
  
    if(localStorage.getItem('token'))
    {

      fetch(`http://localhost:3000/api/fetchuser?token=${localStorage.getItem('token')}`)
      .then(res => res.json()).then((res)=>{
      setEmail(res.email)
      setName(res.name)
      setAddress(res.address)
      setPhone(res.phone)
      setPincode(res.pincode)
      setProgress(100)
    })
        }
    else{
      router.push('/')
    }
   
  
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch(`http://localhost:3000/api/updateuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email,name,address,phone,pincode})
    })
    toast.success('Successfully Updated!', {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    }
  
    const  handlepassSubmit = async () => {

      if(npassword===cpassword)
      {
       const res = await fetch(`http://localhost:3000/api/updatepassword`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email,password,npassword})
        })
        const data = await res.json();
        if(data.success)
        {
        toast.success('Password Successfully Updated!',{
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        }
        else{
          toast.error('Passwords do not match!', {
            position: "top-left",
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

      
      else{
        toast.error('New Passwords do not match!', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }

      setnPassword('')
      setcPassword('')
      setPassword('')

    }

  const handle_change= async (e)=>{

    if(e.target.name==='name')
    {
      setName(e.target.value)
    }
    else if(e.target.name==='address')
    {
      setAddress(e.target.value)
    }
    else if(e.target.name==='phone')
    {
      setPhone(e.target.value)
    }
    else if(e.target.name==='pincode')
    {
      setPincode(e.target.value)

    }
    else if(e.target.name==='password')
    {
      setPassword(e.target.value)
    }
    else if(e.target.name==='cpassword')
    {
      setcPassword(e.target.value)
    }
    else if(e.target.name==='npassword')
    {
      setnPassword(e.target.value)
    }
   }


  

  return (
    
    <div className="container px-2 sm:m-auto min-h-screen">
      <ToastContainer
position="top-left"
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
     
    <h1 className="font-bold text-center text-3xl my-8">Update your Account</h1>

      <h1 className="text-xl font-semibold">1. Delivery Details</h1>
      <div className="mx-auto flex my-2 z-0">
        <div className="px-2 w-1/2">
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              onChange={handle_change}
              value={name}
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="px-2 w-1/2">
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email (cannot be updated)
            </label>

            <input
             value={email}
              readOnly
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
          <div className="relative mb-4">
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
            </label>
            <textarea  onChange={handle_change} value={address} name="address" id="address" cols="30" rows="2" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>

        <div className="mx-auto flex my-2 z-0">
        <div className="px-2 w-1/2">
          <div className="relative mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
               onChange={handle_change}
               value={phone}
              type="phone"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="px-2 w-1/2">
          <div className="relative mb-4"> 
          <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
              Pincode
            </label>
            <input
               onChange={handle_change}
               value={pincode}
              type="text"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="mx-4 mb-4">
<button onClick={handleSubmit} className="flex mr-2 disabled:bg-sky-200  text-white bg-sky-500 border-0 py-2 px-2 focus:outline-none hover:bg-sky-600 rounded text-sm">Submit</button>
</div>

      <h1 className="text-xl font-semibold">2. Change Password</h1>

      <div className="mx-auto flex my-2 z-0">
        <div className="px-2 w-1/2">
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">
             Old Password
            </label>
            <input
              onChange={handle_change}
              value={password}
              type="password"
              id="passwordId"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">
              New Password
            </label>
            <input
              onChange={handle_change}
              value={npassword}
              type="password"
              id="npasswordId"
              name="npassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">
              Confirm New Password
            </label>
            <input
              onChange={handle_change}
              value={cpassword}
              type="password"
              id="cpasswordId"
              name="cpassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        
        </div>

<div className="mx-4">
<button onClick={handlepassSubmit} className="flex mr-2 disabled:bg-sky-200  text-white bg-sky-500 border-0 py-2 px-2 focus:outline-none hover:bg-sky-600 rounded text-sm">Submit</button>
</div>

      
</div>
  )
}

export default page