import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');



export async function POST(res:Request){

    let sucess = false;
    let token;

    const data = await res.json()

    let user = await User.findOne({"email":data.email})
     
    if(user){

        var bytes  = CryptoJS.AES.decrypt(user.password ,process.env.AES_SECRET)

        if(data.email===user.email && data.password===(bytes.toString(CryptoJS.enc.Utf8)))
        {
             
            token = jwt.sign({email:user.email,name:user.name}, process.env.JWT_SECRET,{ expiresIn:'2d'});
            sucess=true;
            
        }
        else{

            sucess=false;
            
        }

    }
    else{
       sucess = false;
      
    }


    return NextResponse.json({success:sucess,token:token})
    
}

export default connectDb()