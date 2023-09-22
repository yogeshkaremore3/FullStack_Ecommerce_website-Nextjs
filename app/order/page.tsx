'use client'
import React from 'react'
import { useSearchParams,useRouter } from 'next/navigation'
import { useEffect,useState } from 'react'
import Error from "next/error";
import { useContext } from 'react';
import { cartContext } from '../context/CartProvider';

const page = () => {

  const { setProgress } = useContext(cartContext)

  const searchParams = useSearchParams()
  const router = useRouter()

  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState({})
  const [products, setproducts] = useState({})
  const [error, seterror] = useState('')
  
  const date = new Date(order.createdAt)

  useEffect(()=>{

    if(!localStorage.getItem('token')||!(orderId))
    {

      router.push('/login')

    }
    else
    {

  fetch(`${process.env.NEXT_PUBLIC_HOST}/api/fetchorder?orderId=${orderId}`)
      .then(response => response.json())
      .then((data) => {
        
        if(!(data.error))
        {
          setOrder(data.order);setproducts(data.order.products)
          setProgress(100)
        }
        else
        {
          seterror(data.error);
        }
      
      });

       }
      
  },[])

  if(error===404)
  {
    return <Error statusCode={404} />
  }

  return (
    <>
    <section className="text-gray-600 body-font overflow-hidden min-h-screen">
    <div className="container px-5 py-24 mx-auto">
      <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order id: #{order.orderId}</h1>
          <p className="leading-relaxed mb-2">Your order has been successfully placed!</p>
          <p className="leading-relaxed mb-2">Order Placed On: {date.toLocaleDateString("en-IN",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className='leading-relaxed mb-6'>Your Payment Status is: <span className='font-semibold text-slate-700'>{order.status}</span></p>
          <div className="flex mb-4">
          <a className="flex-grow  text-center py-2 text-lg px-1">Item Description</a>
          <a className="flex-grow text-center  py-2 text-lg px-1">Quantity</a>
          <a className="flex-grow  text-center py-2 text-lg px-1">Item Total</a>
        </div>


          { Object.keys(products).map((key)=>{
         return<div key={key} className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">{products[key].name}({products[key].size}/{products[key].variant})</span>
            <span className="ml-auto text-gray-900">{products[key].qty}</span>
            <span className="ml-auto text-gray-900">₹{products[key].price} X {products[key].qty} = ₹{products[key].price * products[key].qty}</span>
            </div>
          
          })}
          <div className="flex flex-col">
            <span className="title-font font-medium text-2xl mt-10 text-gray-900">Subtotal: ₹{order.amount}</span>
            <div className='my-6'>

            <button className="flex mx-0 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">Track Order</button>
            </div>
        
          </div>
        </div>
        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://www.bikaji.com/pub/media/animation.gif"/>
      </div>
    </div>
  </section>
  </>
  )
}

export default page