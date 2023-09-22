import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";
import { NextResponse } from "next/server";
export async function GET(res:Request){

const order = await Order.findOne({_id:res.nextUrl.searchParams.get("orderId")})

// console.log(order)
if(!order)
{
    
    return NextResponse.json({error:404});

}
else{
    
    return NextResponse.json({order:JSON.parse(JSON.stringify(order)),error:null});
}

// return NextResponse.json({name:"yogesh"})

}

export default connectDb()