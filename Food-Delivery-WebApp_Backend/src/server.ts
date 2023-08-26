import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

// if error in importing then using ctrl+. to install @types for express and cors
import { sample_foods, sample_tags, sample_users } from "./data";

import { FoodModel } from "./models/Food";

import routes from "./routes/routes"
import { UserModel } from "./models/User";
const app=express()

app.use(express.json())

app.use(cors({

    credentials:true,
    origin:"http://localhost:4200"

}))

app.use("",routes)


main().catch(error=>console.log(error))

async function main(){
  await mongoose.connect("mongodb://127.0.0.1:27017/food-delivery")
  console.log("mongoose connected")

//  FoodModel.create(sample_foods);
// UserModel.create(sample_users) ;
}


const port=5000
const s="started get"




app.listen(port,()=>{
    console.log("server started")
   
    
})