import {NextResponse } from "next/server";
import Order from "@/models/Order";
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

export async function POST(res:Request){

   const data = await res.json();
   const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = data.response;

const sign = validatePaymentVerification({"order_id":data.orderId, "payment_id": razorpay_payment_id },razorpay_signature,process.env.NEXT_PUBLIC_RAZOR_SECRETKEY);

  let order;
  

  if(sign){

   order = await Order.findOneAndUpdate({orderId:razorpay_order_id},{status:'Paid',paymentInfo:JSON.stringify(data.response)})
    for(let slug in order.products)
    {
      
      await Product.findOneAndUpdate({slug:slug},{$inc:{availableQty: - order.products[slug].qty }});
    
    }
   
  }
  else{
    order = await Order.findOneAndUpdate({orderId:razorpay_order_id},{status:'Pending',paymentInfo:JSON.stringify(data.response)})
  }

  return NextResponse.json({objectId:order._id,success:sign})

}
export default connectDb()  