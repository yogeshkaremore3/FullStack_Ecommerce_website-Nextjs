'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter,useSearchParams } from 'next/navigation'
import { useEffect,useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Page = () => {

  const router = useRouter();
  const token = useSearchParams().get('token');

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setcPassword] = useState('')


  useEffect(() => {


    if(localStorage.getItem('token'))
    { 
      router.push('/')
    }

  }, [])


  
  const sendresetEmail = async ()=>{

    const response = await fetch('http://localhost:3000/api/forgot',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify({email:email,sendMail:true})
        })

        const data = await response.json()

        if(data.success)
        {
          toast.success(`${data.message}`,{
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          
            setEmail('')
            router.push('/')
        }
        else{
          toast.error(`${data.message}`,{
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

  const restPassword= async()=>{

    if(password===cpassword)
    {

    const response = await fetch('http://localhost:3000/api/forgot',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify({password:cpassword,token:token,sendMail:false})
        })

        const data = await response.json()

        if(data.success)
        {
          toast.success('Password Successfully Updated',{
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            setPassword('')
            setcPassword('')
            router.push('/')
        }
        else{
          toast.error('some error occured!',{
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            setPassword('')
            setcPassword('')
            router.push('/')
        }
      }
      else{
        toast.error('password do not match!',{
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
  return (
  
    <div className="flex min-h-screen flex-col justify-start px-6 pt-28 lg:px-8">
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
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="/photo3.png" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    {token && <>
    <div>
      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
      <div className="mt-2">
        <input id="passwordId" value={password} onChange={(e)=>{setPassword(e.target.value)}} name="password" type="password" autoComplete="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"/>
      </div>
    </div>
    <div>
      <label htmlFor="password" className="block text-sm mt-2 font-medium leading-6 text-gray-900">Confirm New Password</label>
      <div className="mt-2">
        <input id="cpasswordId" value={cpassword} onChange={(e)=>{setcPassword(e.target.value)}} name="cpassword" type="password" autoComplete="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"/>
      </div>
    </div>

    <div className='pt-7'>
      <button onClick={restPassword} type="submit" className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Continue</button>
    </div>
    {password !=cpassword && <span className='text-red-600'>Password do not match</span>}
  </>}
  
    {!token && <>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input id="email" value={email}  onChange={(e)=>{setEmail(e.target.value)}} name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div className='pt-7'>
        <button onClick={sendresetEmail} type="submit" className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Continue</button>
      </div>
    </>}

    <p className="mt-10 text-center text-sm text-gray-500">
      Or 
      <Link href={'/login'} className="font-semibold leading-6 text-sky-600 hover:text-sky-500">  Login</Link>
    </p>
  </div>
</div>
  )
}

export default Page