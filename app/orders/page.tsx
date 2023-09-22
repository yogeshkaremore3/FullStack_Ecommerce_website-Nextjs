'use client'
import React from 'react'
import { useEffect ,useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useContext } from 'react'
import { cartContext } from '../context/CartProvider'


const Page = () => {

  const router = useRouter()
  const [orders, setOrders] = useState([])
  const { setProgress } = useContext(cartContext)



  useEffect(() => {

    const fetchdata=async()=>{

     const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/fetchorders`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(localStorage.getItem('token'))
  })
  
  const data = await res.json();

  setOrders(data)
  setProgress(100)

    }
   
    if(!localStorage.getItem('token'))
    {
      router.push('/')
    }
    else{

      fetchdata()
    }

  },[])

  return (
   <div className="container m-auto min-h-screen">

   <h1 className='font-semibold text-center text-2xl p-8'>My Orders</h1>
    
   <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">#Order Id</th>
              <th scope="col" className="px-6 py-4">Email</th>
              <th scope="col" className="px-6 py-4">Amount</th>
              <th scope="col" className="px-6 py-4">Details</th>
            </tr>
          </thead>
          <tbody>

            {orders.map((item)=>{

                 return <tr key={item._id}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                  <td className="whitespace-nowrap px-6 py-4 font-medium">{item.orderId}</td>
                  <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
                  <td className="whitespace-nowrap px-6 py-4">{item.amount}</td>
                  <td className="whitespace-nowrap px-6 py-4"><Link className='text-sky-500 underline' href={`/order?orderId=${item._id}`}>Details</Link></td>
                   </tr> })}

          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

   </div>
  )
}

export default Page