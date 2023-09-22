import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDb from "@/middleware/mongoose";


export async function POST(req:Request){

    const res = await req.json();

const user = await User.findOneAndUpdate({ email:res.email},{name:res.name,address:res.address,phone:res.phone,pincode:res.pincode});
return NextResponse.json({user:user})
    
}
export default connectDb()