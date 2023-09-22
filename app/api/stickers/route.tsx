import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest){

    let products = await Product.find({category:'stickers'})


    
    let stickers={}

    for(let item of products)
    {

        if(item.title in stickers)
        {

           if(!stickers[item.title].color.includes(item.color)&&item.availableQty>0)
           {

            stickers[item.title].color.push(item.color)
           } 

           if(!stickers[item.title].size.includes(item.size)&&item.availableQty>0)
           {
            
           stickers[item.title].size.push(item.size)

           }

        }
        else{

            stickers[item.title]=JSON.parse(JSON.stringify(item));
            if(item.availableQty>0)
            {
                stickers[item.title].color=[item.color];
                stickers[item.title].size=[item.size]
            }

        }

    }


    return NextResponse.json({stickers})

    
}

export default connectDb();

