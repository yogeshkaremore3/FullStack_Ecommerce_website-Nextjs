import mongoose from "mongoose";

const connectDb= async ()=>{

    if(!mongoose.connections[0].readyState){

        
        await mongoose.connect(process.env.MONGO_URI)
    }

  
} 

export default connectDb;