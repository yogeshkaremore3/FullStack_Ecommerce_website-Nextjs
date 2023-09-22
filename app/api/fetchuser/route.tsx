import jwt  from "jsonwebtoken"
import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDb from "@/middleware/mongoose";



export async function GET(req:Request){

    
    const  data = jwt.verify(req.nextUrl.searchParams.get("token"),process.env.JWT_SECRET);

    const user = await User.findOne({email:data.email})

    return NextResponse.json({email:data.email,name:user.name,address:user.address,phone:user.phone,pincode:user.pincode});

}
export default connectDb()