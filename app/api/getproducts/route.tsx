import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest){

    let products = await Product.find()



    return NextResponse.json({products})

    
}

export default connectDb();

