'use client'
import {createContext} from "react";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useRouter,useSearchParams  } from 'next/navigation'
import {toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar'
import { usePathname } from "next/navigation";



export const cartContext = createContext()







export default function CartProvider ({children}:any) {
  
  const searchParams = useSearchParams()
  
  const [cart, setCart] = useState({})
  const [subtotal, setSubtotal] = useState(0)
  const router = useRouter()
  const [user, setUser] = useState({ value: null})
  const [progress, setProgress] = useState(0)
  const [dropdown, setDropdown] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const pathname = usePathname()




  useEffect(() => {
    
  try {

    if(localStorage.getItem('cart'))
    {
      setCart(JSON.parse(localStorage.getItem('cart')))
      saveCart(JSON.parse(localStorage.getItem('cart')))
    }
    
  } catch (error) {

    console.error(error);
    localStorage.clear(); 
  }

  const token = localStorage.getItem('token');

  if(token)
  {

    setUser({value: token})
    
  }


  
  setProgress(40)

  Object.keys(cart).length!==0 && setSidebar(true);
  let exempte =['/login','/signup','/','/forgot']
  let exemptes =['/order','orders','/myaccount','/cheakout']
  if(exemptes.includes(pathname)){

    setSidebar(false)
  }

  if(exempte.includes(pathname)){
    setSidebar(false)
    setProgress(100)
  }

   
  },[searchParams])




  const logout=()=>{

    localStorage.removeItem('token')
    setUser({value:null})
    toast.success('Logout successfully!', {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      setDropdown(false)
      router.push('/')
      clearCart()
  }
  


  const saveCart=(myCart)=>{

    localStorage.setItem('cart',JSON.stringify(myCart))

    let subt=0;
    let keys=Object.keys(myCart);
    for(let i=0;i<keys.length;i++){
      
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;

    }

    setSubtotal(subt);


  }

  const addToCart=(itemCode,qty,price,name,size,variant)=>{

    setSidebar(true)

    let newCart=cart; 

    if(itemCode in cart)
    {
      newCart[itemCode].qty=cart[itemCode].qty + qty;
    }
    else{
      newCart[itemCode]={qty:1,price,name,size,variant};
    }
    setCart(newCart)
    saveCart(newCart)

  }


  const buyNow=(itemCode,qty,price,name,size,variant)=>{


    let newCart={}
    newCart[itemCode] = {qty:1,price,name,size,variant}
     
    setCart(newCart)
    saveCart(newCart)
    if(localStorage.getItem('token'))
    {
      router.push('/cheakout')
    }
    else{
      router.push('/login')
    }

  }



  const clearCart=()=>{

    setCart({})
    saveCart({})
    setSidebar(false)

  }

  const removeFromCart=(itemCode,qty,price,name,size,variant)=>{

    let newCart=cart; 

    if(itemCode in cart)
    {
      newCart[itemCode].qty=cart[itemCode].qty - qty;
    }
    if(newCart[itemCode].qty<=0){
     
      delete newCart[itemCode]
      
    }
    setCart(newCart)
    saveCart(newCart)

  }



  return (
  
    <cartContext.Provider  value={{setProgress,cart,addToCart,removeFromCart,clearCart,subtotal,buyNow}}>
        
        <LoadingBar
        color='blue'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={3}
      />
        <Navbar sidebar={sidebar} setSidebar={setSidebar} setDropdown={setDropdown} dropdown={dropdown}  Logout={logout} user={user}  cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />

       
        {children}
      

    </cartContext.Provider>

  )
}