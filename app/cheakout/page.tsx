'use client'
import React from "react";
import { cartContext } from "../context/CartProvider";
import { useContext,useState,useEffect } from "react";
import {AiFillPlusCircle,AiFillMinusCircle } from 'react-icons/ai';
import {BsFillBagCheckFill} from  'react-icons/bs';
import Script from "next/script";
import { useRouter} from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Page = () => {

  const {setProgress,cart,addToCart,clearCart,removeFromCart,subtotal} = useContext(cartContext);

  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  
 

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
      if(res.pincode)
      {
        fetchpincode(res.pincode);
       }
    else{
      setCity('')
      setState('')
    }
      setProgress(100)
    })
       }
    else{
      router.push('/login')
    }
   
  
  }, [])

  const fetchpincode = async (pincode)=>{

    const res = await fetch('http://localhost:3000/api/pincode');
      
    const data = await res.json();

    if(Object.keys(data).includes(pincode))
      {
        setCity(data[pincode][0])
        setState(data[pincode][1])
      }

  }
  

  const handle_change= async (e)=>{

    if(e.target.name==='name')
    {
      setName(e.target.value)
    }
    else if(e.target.name==='email')
    {
      setEmail(e.target.value)
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

      if(e.target.value.length === 6)
      {
      
    fetchpincode(e.target.value);
    
    }
    else{
      setCity('')
      setState('')
    }
     
    }
   }


   



  const initiatePayment= async ()=>{

    //form validation
       if(!name)
      {
        alert('please enter a valid name')
      }

      else if(name.length<5)
      {
        alert('name must be at least 5 characters')
      }
      else if(!email)
      {
        alert('please enter a valid email')
      }
      else if(!address)
      {
        alert('please enter a valid address')
      }
      else if(address.length<5)
      {
        alert('address must be at least 5 characters')
      }
      else if(!(phone) || !(phone.length===10)|| !(Number.isInteger(Number(phone))))
      {
        alert('please enter a valid phone number')
      }
      else if(!(pincode) || !(pincode.length===6) || !(Number.isInteger(Number(pincode))))
      {
        alert('please enter a valid pincode')
      }
      else if(!(city) || !(state))
      {
        alert('Soory! We do not deliver to this pincode')
      }
      else{

        //initiate payment
        
    const data ={cart,subtotal,email,name,address,phone,pincode,state,city};

    const datax = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    })

     const TXN = await datax.json()

    if(TXN.success)
    {
      
      const orderId = TXN.orderId.id;
      
    var options = {
      key:process.env.NEXT_PUBLIC_RAZOR_KEYID, // Enter the Key ID generated from the Dashboard
      amount:TXN.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "opencart.com",
      image:"/photo.png",
      order_id:orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler:function(response){

        toast.success(`${"redirecting...please wait don't refresh page..."}`,{
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        // console.log(response)
  
       fetch(`${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`, {
        method: "POST",
        body: JSON.stringify({response:response,orderId:orderId}),
        headers: {
          "content-type": "application/json",
        },
      }).then(response=>response.json()).then((res)=>{

        if(res.success)
        {
          clearCart()
        
          router.push(`${process.env.NEXT_PUBLIC_HOST}/order?orderId=${res.objectId}`)

        }
        else{
          alert('some error occured')
        }
      
      })
    },
      prefill: {
        "name": "yogesh karemore",
        "email": "yogeshkaremore3@gmail.com",
        "contact": "7387404126"
    },
      theme: {
          "color": "#3399cc"
      }
  };
  const razor = new window.Razorpay(options);
  razor.on('payment.failed', function (response){

    alert(response.error.reason);
});
      razor.open();
    }
    else{
      if(TXN.cartClear)
      {clearCart()}

        toast.error(`${TXN.error}`,{
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }); }

         }
  }

  
  return (

    <div className="container px-2 sm:m-auto min-h-screen">
      <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
      
        <ToastContainer
position="top-left"
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
    <h1 className="font-bold text-center text-3xl my-7">Cheakout</h1>

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
           {/* <small  className="form-text text-muted">{}</small> */}

          </div>
        </div>

        <div className="px-2 w-1/2">
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>

            <input
             onChange={handle_change}
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
      <div className="mx-auto flex my-2 z-0">
        <div className="px-2 w-1/2">
          <div className="relative mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              readOnly={true}
              value={state}
              type="text"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="px-2 w-1/2">
          <div className="relative mb-4">
          <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              District
            </label>
            <input
            readOnly={true}
            value={city}
              type="text"
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      <h1 className="text-xl font-semibold">2. Review Cart Items</h1>

      <div  className=" sideCart  p-6 m-2 bg-sky-100 ">
        
        <ol className='list-decimal font-semibold'>
          {
            Object.keys(cart).length===0 && <><div className='text-center font-semibold mt-16'>Your cart is empty!</div>
            <div className='text-center text-sm  font-light mb-16'>Add items to it now.</div></>
          }
          {Object.keys(cart).map((k)=>{return <li key={k}>
            <div className='item flex my-5'>
            <div className=' font-semibold'>{cart[k].name} {!(cart[k].size==="") && <>({cart[k].size}/{cart[k].variant})</>} </div>
            <div className='w-1/3 flex font-semibold text-lg justify-center items-center'><AiFillMinusCircle onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className='cursor-pointer text-sky-600'/> <span className='mx-2 text-sm'>{cart[k].qty}</span><AiFillPlusCircle onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className='cursor-pointer text-sky-600'/></div>
            </div>
          </li>})}        
        </ol>
            <span className="total font-bold">Subtotal: ₹{subtotal}</span>
  
      </div>

<div className="mx-4">
<button disabled={!subtotal} onClick={initiatePayment} className="flex mr-2 disabled:bg-sky-200  text-white bg-sky-500 border-0 py-2 px-2 focus:outline-none hover:bg-sky-600 rounded text-sm"><BsFillBagCheckFill/>Pay ₹{subtotal}</button>
</div>

      
    </div>
  );
};

export default Page;
