import { NextResponse } from "next/server";
import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";
const Razorpay = require('razorpay');

export async function POST(res:Request){

    const req =  await res.json()
    
var instance = new Razorpay({ key_id:process.env.NEXT_PUBLIC_RAZOR_KEYID, key_secret:process.env.NEXT_PUBLIC_RAZOR_SECRETKEY})

const  options = {
  amount:(req.subtotal)*100,  
  currency: "INR",
};

const orderId = await instance.orders.create(options);


let order;
let product;
let sumTotal=0;
let success = false;
let error;
let cartClear = false;

let cart = req.cart;



   for(let item in cart)
   {
      product = await Product.findOne({slug:item})
      sumTotal +=cart[item].price * cart[item].qty;
 
      if(product.availableQty >= cart[item].qty)
      {
            if(product.price === cart[item].price && sumTotal===req.subtotal)
           {
          //initiate oredr coresponding to this order id
             order = new Order({
             email:req.email,
             orderId:orderId.id,
             products:req.cart,
             name:req.name,
             address:req.address,
             phone:req.phone,
             city:req.city,
             state:req.state,
             pincode:req.pincode,
             amount:req.subtotal,})
             await order.save()
             success = true;
            }
           else{
               error="The price of some items in your cart have changed. Please try again!"
               cartClear = true;
            }
          
        }
      else{
        error="some items in your cart went out of stock. Please try again!";
        cartClear = true;
       }
   }
    


 return NextResponse.json({orderId:orderId,success:success,error:error,cartClear:cartClear});

}

export default connectDb()