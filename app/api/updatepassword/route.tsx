import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(req:Request){

    const res = await req.json();

    const user = await User.findOne({email:res.email})
    const oldpass = (CryptoJS.AES.decrypt(user.password,process.env.AES_SECRET)).toString(CryptoJS.enc.Utf8);
    if(oldpass === res.password)
    {

     await User.findOneAndUpdate({email:res.email},{password:CryptoJS.AES.encrypt(res.npassword,process.env.AES_SECRET).toString()})

     return NextResponse.json({success:true})
      
    }
    else
    {
        return NextResponse.json({success:false});
        
    }
    
}
export default connectDb()