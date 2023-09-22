import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import { NextResponse } from "next/server";

export async function POST(request:Request){

    const res = await request.json();

    let success = false;

    for(let i=0;i<res.length;i++)
    {

    let p = new Product({
        brand:res[i].brand,
        title:res[i].title,
        slug:res[i].slug,
        desc:res[i].desc,
        img:res[i].img,
        category:res[i].category,
        size:res[i].size,
        color:res[i].color,
        price:res[i].price,
        availableQty:res[i].availableQty,   
    })

    await p.save()
    success = true
}

return NextResponse.json({success: success})

    
}
export default connectDb();