import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import { NextResponse } from "next/server";

export async function POST(request:Request){

    const res = await request.json();

   

    for(let i=0;i<res.length;i++)
    {

    let p = await Product.findByIdAndUpdate(res[i]._id,res[i])


   
}

return NextResponse.json({res})

    
}
export default connectDb();