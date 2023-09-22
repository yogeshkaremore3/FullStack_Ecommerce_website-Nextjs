'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRef,useEffect,useContext } from 'react';
import { AiOutlineShoppingCart ,AiFillCloseCircle,AiFillPlusCircle,AiFillMinusCircle } from 'react-icons/ai';
import {BsFillBagCheckFill} from  'react-icons/bs';
import {MdAccountCircle} from  'react-icons/md';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Navbar = ({sidebar,setSidebar,dropdown,setDropdown,Logout,user,cart,addToCart,removeFromCart,clearCart,subtotal}) => {

  const ref= useRef()
  
  function toggleCart() {

    setSidebar(!sidebar)

    // if (ref.current.classList.contains('translate-x-full')) {
    //   ref.current.classList.remove('translate-x-full');
    //   ref.current.classList.add('translate-x-0');
    // }
    // else if (!ref.current.classList.contains('translate-x-full')) {
    //   ref.current.classList.remove('translate-x-0');
    //   ref.current.classList.add('translate-x-full');
    // }
  }
 
  return (
    <>
    {dropdown  && <div onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="fixed right-12 top-11 rounded-md w-32 py-4 bg-gray-100 px-5 z-30">
    <ul>
      <Link href={'/myaccount'}><li className='py-1 hover:text-sky-300 text-sm'>My Account</li></Link>
      <Link href={'/orders'}><li className='py-1 hover:text-sky-300 text-sm'>My Orders</li></Link>
      <li onClick={Logout} className='py-1 cursor-pointer hover:text-sky-300 text-sm'>Logout</li>
    </ul>
  </div>}
    
    <div className={`flex flex-col md:flex-row md:justify-start items-center justify-between mb-1 py-2 shadow-xl sticky top-0 bg-white z-10 ${!sidebar && 'overflow-hidden'}`}>
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
    <div className="logo mr-auto md:mx-5"><Link href="/"><Image src="/photo.png" alt="logo" width={150} height={50}/></Link></div>
      <div className="nav">
        <ul className='flex space-x-4 md:space-x-10 font-bold md:text-md'>
          <Link href="/tshirt"><li className='hover:text-sky-300'>Tshirt</li></Link>
          <Link href="/hoodies"><li className='hover:text-sky-300'>Hoodies</li></Link>
          <Link href="/stickers"><li className='hover:text-sky-300'>Stickers</li></Link>
          <Link href="/mugs"><li className='hover:text-sky-300'>Mugs</li></Link>
        </ul>
      </div>
      <div  className="cart absolute items-center right-0 top-4 mx-4 cursor-pointer flex">

       {user.value && <MdAccountCircle onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className='text-xl md:text-3xl mx-2'/> }

     {!user.value && <Link href={'/login'}>
    
    <button className='bg-sky-600 text-white px-2 mx-2 py-1 rounded-md text-sm'>Login</button>
      
      </Link>}

      <AiOutlineShoppingCart onClick={toggleCart} className='text-xl md:text-3xl'/>
      </div>

      <div ref={ref} className={`w-72 h-[100vh] z-50 sideCart overflow-y-scroll  absolute top-0  px-8 py-10 bg-sky-200 transform transition-all ${sidebar?'right-0':'-right-96'}`}>
        <h2 className='font-bold text-xl text-center'>Shoping Cart</h2>
        <span onClick={toggleCart} className='absolute top-5 right-3 cursor-pointer text-2xl text-sky-600'><AiFillCloseCircle/></span>
        <ol className='list-decimal font-semibold'>
          {
            Object.keys(cart).length===0 && <><div className='text-center font-semibold mt-16'>Your cart is empty!</div>
            <div className='text-center text-sm  font-light mb-16'>Add items to it now.</div></>
          }
          {Object.keys(cart).map((k)=>{return <li key={k}>
            {/* {console.log(k)} */}
            <div className='item flex my-5'>
            <div className='w-2/3 font-semibold'>{cart[k].name} {!(cart[k].size==="") && <>({cart[k].size}/{cart[k].variant})</>}</div>
            <div className='w-1/3 flex font-semibold text-lg justify-center items-center'><AiFillMinusCircle onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className='cursor-pointer text-sky-600'/> <span className='mx-2 text-sm'>{cart[k].qty}</span><AiFillPlusCircle onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className='cursor-pointer text-sky-600'/></div>
            </div>
          </li>})}  
        </ol>
        <div className="total font-bold my-2">Subtotal: ₹{subtotal}</div>
        <div className="flex">
       <Link href={'/cheakout'}><button disabled={Object.keys(cart).length===0} className="flex mr-2 disabled:bg-sky-300 text-white bg-sky-500 border-0 py-2 px-2 focus:outline-none hover:bg-sky-600 rounded text-sm"><BsFillBagCheckFill/>Cheakout</button></Link>
        <button disabled={Object.keys(cart).length===0} onClick={clearCart}  className="disabled:bg-sky-300 flex mr-2  text-white bg-sky-500 border-0 py-2 px-2 focus:outline-none hover:bg-sky-600 rounded text-sm">Clear Cart</button>
        
        </div>

      </div>

    </div>
    </>
  )
}

export default Navbar