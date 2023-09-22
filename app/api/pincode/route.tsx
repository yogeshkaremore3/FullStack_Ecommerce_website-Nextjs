import { NextRequest, NextResponse } from "next/server";
import pincodes from '../../../pincodes.json'

export  async function GET(req:NextRequest) {

 
    return NextResponse.json(pincodes)
    
  }