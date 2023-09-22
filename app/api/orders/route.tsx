import { NextResponse } from "next/server";
import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";

export async function GET(res:Request){

    const Orders = await Order.find({})

    return NextResponse.json({name:"yogesh"})
    
}

export default connectDb()