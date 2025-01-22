import mongoose from 'mongoose';

export async function DBConnect(){
    return await mongoose.connect(process.env.DB)
}