import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest){

    let products = await Product.find({category:'mugs'})


    
    let mugs={}

    for(let item of products)
    {

        if(item.title in mugs)
        {

           if(!mugs[item.title].color.includes(item.color)&&item.availableQty>0)
           {

            mugs[item.title].color.push(item.color)
           } 

           if(!mugs[item.title].size.includes(item.size)&&item.availableQty>0)
           {
            
           mugs[item.title].size.push(item.size)

           }

        }
        else{

            mugs[item.title]=JSON.parse(JSON.stringify(item));
            if(item.availableQty>0)
            {
                mugs[item.title].color=[item.color];
                mugs[item.title].size=[item.size]
            }

        }

    }


    return NextResponse.json({mugs})

    
}

export default connectDb();

