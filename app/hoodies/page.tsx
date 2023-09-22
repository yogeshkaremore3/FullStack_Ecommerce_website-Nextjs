
'use client'
import React from 'react'
import { useEffect,useState } from 'react'
import Link from 'next/link'
import { useContext } from 'react'
import { cartContext } from '../context/CartProvider'


const Page = () => {

  
  const [product, setproduct] = useState({})
  const { setProgress } = useContext(cartContext)

  
  useEffect(() => {
    
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/hoodies`)
    .then(response => response.json())
    
    .then((data)=>{

      setproduct(data.hoodies)  
      setProgress(100)
    })
    
    
  },[])

   
  
  return (
    <div>
    <section className="text-gray-600 body-font min-h-screen">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap -m-4">

       {Object.keys(product).map((item)=>{
      return  <div key={product[item]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
        <Link passHref={true} href={`/product/${product[item].slug}`}>
            <img alt="ecommerce" className="h-[30vh] md:h-[36vh] m-auto  block " src={product[item].img}/>
            <div className="mt-4 text-center md:text-left">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product[item].brand}</h3>
            <h2 className="text-gray-900 title-font text-lg font-medium">{product[item].title}</h2>
            <p className="mt-1">₹{product[item].price}</p>
            <div className='mt-1'>
            <span className='text-neutral-400'>Size</span>
            {product[item].size.includes('S')&&<span className='mx-1 px-1 border border-gray-300'>S</span>}
            {product[item].size.includes('M')&&<span className='mx-1 px-1 border border-gray-300'>M</span>}
            {product[item].size.includes('L')&&<span className='mx-1 px-1 border border-gray-300'>L</span>}
            {product[item].size.includes('XL')&&<span className='mx-1 px-1 border border-gray-300'>XL</span>}
            {product[item].size.includes('XXL')&&<span className='mx-1 px-1 border border-gray-300'>XXL</span>}
            </div>
            <div className="mt-1">

              {product[item].color.includes('white')&&  <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
              {product[item].color.includes('red')&&  <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
              {product[item].color.includes('sky')&&  <button className="border-2 border-gray-300 ml-1 bg-sky-500 rounded-full w-6 h-6 focus:outline-none"></button>}
              {product[item].color.includes('green')&&  <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
              {product[item].color.includes('black')&&  <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
              {product[item].color.includes('yellow')&&  <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
              {product[item].color.includes('pink')&&  <button className="border-2 border-gray-300 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none"></button>}

            </div>


          </div>
          </Link>
        </div>

})}
         
        
        </div>
      </div>
  </section>
  </div>
  )
}

export default Page