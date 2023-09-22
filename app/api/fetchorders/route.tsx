import { NextResponse } from "next/server";
import jwt  from "jsonwebtoken"
import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";




export async function POST(req:Request){
  
    const token = await req.json();


   const  data = jwt.verify(token,process.env.JWT_SECRET);

    const email = await Order.find({email:data.email,status:'Paid'})

    return NextResponse.json(email)
}

export default connectDb()