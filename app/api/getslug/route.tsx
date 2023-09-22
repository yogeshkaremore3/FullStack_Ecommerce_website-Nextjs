import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import { NextResponse } from "next/server";


export async function GET(res:Request) {

  let product = await Product.findOne({slug:res.nextUrl.searchParams.get("a")})

  

  if(!product)
  {
    return NextResponse.json({error:404})
  }
  else{

  let variants = await Product.find({title:product.title,category:product.category})
  let colorSizeSlug={}

  for(let item of variants)
  {

    if(Object.keys(colorSizeSlug).includes(item.color))
    {
        colorSizeSlug[item.color][item.size]={slug:item.slug}
    }
    else{

        colorSizeSlug[item.color] = {} 

        colorSizeSlug[item.color][item.size]={slug:item.slug}

    }
  }

   

return NextResponse.json({product:JSON.parse(JSON.stringify(product)),variants:JSON.parse(JSON.stringify(colorSizeSlug)),error:null});

}
    
}
export default connectDb();