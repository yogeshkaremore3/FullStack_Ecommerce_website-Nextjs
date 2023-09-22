import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");

export async function POST(res:Request){

    let success = false;

    const data = await res.json()

    const {name,email,password} = data;

    let u = await User.findOne({"email":email})

    if(!u)
    {
        let user = new User({name,email,password:CryptoJS.AES.encrypt(password,process.env.AES_SECRET).toString()})
    
        await user.save();
    
        success = true
    }

    return NextResponse.json({success:success})
    
}

export default connectDb()