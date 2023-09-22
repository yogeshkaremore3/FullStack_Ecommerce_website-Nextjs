import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest){

    let products = await Product.find({category:'hoodies'})


    
    let hoodies={}

    for(let item of products)
    {

        if(item.title in hoodies)
        {

           if(!hoodies[item.title].color.includes(item.color)&&item.availableQty>0)
           {

            hoodies[item.title].color.push(item.color)
           } 

           if(!hoodies[item.title].size.includes(item.size)&&item.availableQty>0)
           {
            
           hoodies[item.title].size.push(item.size)

           }

        }
        else{

            hoodies[item.title]=JSON.parse(JSON.stringify(item));
            if(item.availableQty>0)
            {
                hoodies[item.title].color=[item.color];
                hoodies[item.title].size=[item.size]
            }

        }

    }


    return NextResponse.json({hoodies})

    
}

export default connectDb();

