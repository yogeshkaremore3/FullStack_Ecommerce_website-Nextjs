import mongoose from "mongoose";
const ForgotSchema = new mongoose.Schema({
    email:{type:'string',required: true},
    token:{type:'string',required: true},
},{timestamps:true})

mongoose.models={}

export default mongoose.model('forgot',ForgotSchema)