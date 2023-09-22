'use client'
import React from 'react'
import { useState,useEffect } from 'react'
import { cartContext } from '@/app/context/CartProvider'
import { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import Error from 'next/error'

const Page = ({params}:{params:{slug:String}}) => {


  const slug = params.slug;
  const router = useRouter();

  const [variants, setVariants] = useState({})
  const [size, setSize] = useState({})
  const [color, setColor] = useState([])
  const [colorx, setColorx] = useState({})
  const [product, setProduct] = useState({})
  const [error, seterror] = useState('')
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getslug?a=${slug}`)
    .then(response => response.json())
    
    .then((data)=>{
  
      
      if(!(data.error)){
        setColor(Object.keys(data.variants[data.product.color]))
        setColorx(data.product.color)
        setSize(data.product.size)
        setVariants(data.variants)
        setProduct(data.product) 
      }
      else{

        seterror(data.error)
      }
      
      setProgress(100)
    })
    
  },[])
  
  

  const context = useContext(cartContext);

  const {cart,addToCart,removeFromCart,clearCart,subtotal,buyNow,setProgress} = context;


  const [pin, setPin] = useState()

  const [service, setService] = useState()

  const cheakService= async ()=>{

    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson= await pins.json()

    if(Object.keys(pinJson).includes(pin))
    {
      setService(true)
      toast.success('Your Pincode is Serviceable!', {
        position:"bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else{
      setService(false)
      toast.error('Sorry, Your Pincode is not Serviceable!', {
        position:"bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

  }

  const onChangePin=(e)=>{

    setPin(e.target.value)
  }

  const refreshVariant=(newsize,newcolor)=>{

  let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]['slug']}`

  router.push(url);

  }

   if(error===404)
   {
    return <Error statusCode={404}/>
   }

  return (
   <>
    <section className="text-gray-600 body-font overflow-hidden min-h-screen">

    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />


  <div className="container px-5 py-16 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-24  object-cover object-center rounded" src={product.img}/>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.brand}</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} {!(product.size==="") && <>({product.size}/{product.color})</>}</h1>
        <div className="flex mb-4">
          <span className="flex items-center">
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-sky-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-sky-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-sky-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-sky-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-sky-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="text-gray-600 ml-3">4 Reviews</span>
          </span>
          <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
            <a className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
        </div>
        <p className="leading-relaxed">{product.desc}</p>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
         {!(colorx==="") && <div className="flex">
            <span className="mr-3">Color</span>
            {Object.keys(variants).includes('white')&&  Object.keys(variants['white']).includes(size) &&  <button onClick={()=>{refreshVariant(size,'white')}} className={`border-2  ml-1 bg-white rounded-full w-6 h-6 focus:outline-none ${colorx==='white'?'border-black':'border-gray-300'}`}></button>}
           {Object.keys(variants).includes('sky')&&  Object.keys(variants['sky']).includes(size) && <button onClick={()=>{refreshVariant(size,'sky')}} className={`border-2  ml-1 bg-sky-500 rounded-full w-6 h-6 focus:outline-none ${colorx==='sky'?'border-black':'border-gray-300'}`}></button>}
           {Object.keys(variants).includes('red')&&  Object.keys(variants['red']).includes(size) && <button onClick={()=>{refreshVariant(size,'red')}} className={`border-2  ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none ${colorx==='red'?'border-black':'border-gray-300'}`}></button>}
           {Object.keys(variants).includes('green')&& Object.keys(variants['green']).includes(size) &&  <button onClick={()=>{refreshVariant(size,'green')}} className={`border-2  ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${colorx==='green'?'border-black':'border-gray-300'}`}></button>}
           {Object.keys(variants).includes('black')&&  Object.keys(variants['black']).includes(size) && <button onClick={()=>{refreshVariant(size,'black')}} className={`border-2  ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${colorx==='black'?'border-black':'border-gray-300'}`}></button>}
           {Object.keys(variants).includes('pink')&&  Object.keys(variants['pink']).includes(size) && <button onClick={()=>{refreshVariant(size,'pink')}} className={`border-2  ml-1 bg-pink-700 rounded-full w-6 h-6 focus:outline-none ${colorx==='pink'?'border-black':'border-gray-300'}`}></button>}
           {Object.keys(variants).includes('yellow')&& Object.keys(variants['yellow']).includes(size) &&  <button onClick={()=>{refreshVariant(size,'yellow')}} className={`border-2  ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${colorx==='yellow'?'border-black':'border-gray-300'}`}></button>}

          </div>}
          {!(size==="") && <div className="flex ml-6 items-center">
            <span className="mr-3">Size</span>
            <div className="relative">
              <select value={size} onChange={(e)=>{refreshVariant(e.target.value,colorx)}} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-500 text-base pl-3 pr-10">
                {color.includes('S')&&<option value={'S'}>S</option>}
                {color.includes('M')&&<option value={'M'}>M</option>}
                {color.includes('L')&&<option value={'L'}>L</option>}
                {color.includes('XL')&&<option value={'XL'}>XL</option>}
                {color.includes('XXL')&&<option value={'XXL'}>XXL</option>}
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>}
        </div>
        <div className="flex">
          {product.availableQty>0?<span className="title-font font-medium text-2xl text-gray-900">₹{product.price}.00</span>:<span className="title-font font-medium text-2xl text-gray-900">Out of Stock!</span>
          }
          <button disabled={product.availableQty<=0} onClick={()=>{buyNow(slug,1,product.price,`${product.brand} ${product.title}`,size,colorx)}} className="disabled:bg-sky-200 flex ml-4 md:ml-8 text-white bg-sky-500 border-0 py-3 px-2 text-sm  md:px-4 focus:outline-none hover:bg-sky-600 rounded">Buy Now</button>
          <button disabled={product.availableQty<=0} onClick={ ()=>{addToCart(slug,1,product.price,`${product.brand} ${product.title}`,size,colorx)}}  className="disabled:bg-sky-200 flex ml-2 md:ml-4 text-white bg-sky-500 border-0 py-3 px-2 text-sm  md:px-4  focus:outline-none hover:bg-sky-600 rounded">Add to Cart</button>
          <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
        </div>
        <div className="pin flex mt-6 text-sm space-x-2">
          <input type="text" onChange={onChangePin} className=' border-grey-300 px-2 rounded-md outline-none border-2'placeholder='Enter your Pincode'/>
          <button onClick={cheakService} className=" text-white bg-sky-500 border-0 py-2 px-2 focus:outline-none hover:bg-sky-600 rounded">Cheak</button>
        </div>
         {(!service && service!=null) && <div className="text-red-500 mt-3 text-sm">Soory! We do not deliver to this pincode</div>}
      {(service && service!=null) && <div className="text-green-500 text-sm mt-3">Yay! This pincode is serviceable</div>}
      </div>
    </div>
  </div>
</section>
  </>
  )
}

export default Page 