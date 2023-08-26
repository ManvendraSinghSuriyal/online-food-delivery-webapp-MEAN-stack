import { Router } from "express";
import { FoodModel } from "../models/Food";
import jwt from "jsonwebtoken"
import { Aggregate } from "mongoose";
import { User, UserModel } from "../models/User";

import bcrypt from "bcryptjs";
import { JWT_SECRET_KEY } from "../constants/jwt_secretkey";
import auth from "../middlewares/auth";
import { OrderModel } from "../models/Order";
import { OrderStatus } from "../constants/OrderStatus";

 const router=Router()

 router.use('/api/orders',auth)





//------------------------------------Food Routes---------------------------------


 router.get("/api/food/search/:searchTerm",async(req,res)=>
 {
  
    const searchRegex=new RegExp(req.params.searchTerm,'i')
//  const searchTerm=req.params.searchTerm
//  FoodModel.
//  const foods=sample_foods.filter((food)=>food.name.toLowerCase().includes(searchTerm.toLowerCase()))

const foods= await FoodModel.find({name:{$regex:searchRegex}})
res.send(foods)
 })
 
 
 
 router.get("/api/food/tags/", async(req,res)=>
 {
 
    const tags= await FoodModel.aggregate([

        {
            $unwind:'$tags'
        },
        {
            $group:{
                _id:'$tags',
                count:{$sum:1}
            }
        },

        {

            $project:{
                _id:0,
                name:'$_id',
                count:"$count"
            }
        }
    ]).sort({count:-1})


    const all={
        name:'All',
        count: await FoodModel.countDocuments()
    };
    
     tags.unshift(all)
     
 res.send(tags)
 })
 
 router.get("/api/food/",async(req,res)=>
 {
 const foods= await FoodModel.find();
 res.send(foods)
 })
 
 
 router.get("/api/food/:foodId",async(req,res)=>
 {


  try {
    const foodId=req.params.foodId
    const food= await FoodModel.findById(foodId)
 //    const food=  sample_foods.find(food=>food.id==foodId)
    if(food){
     res.send(food)
           }
      else
     {
     console.log("Food Error ::::not found")
      res.status(404).send("Food Not found");
     }
    
  } catch (error) {
    
    console.error("Database error:", error);
    res.status(500).send("Internal Server Error");

  }
   



})
 
 
 router.get("/api/food/tag/:tag",async(req,res)=>
 {
     const tag=req.params.tag
 
     const food=await FoodModel.find({tags:tag})
//    const food=  sample_foods.filter(food=>food.tags?.includes(tag))
 res.send(food)
 })


// //-----------------------------------------------------------------------------




// //-------------------------------------User Routes---------------------------------

router.post("/api/users/signup",async(req,res)=>{
    const{name,email,password,address}=req.body
    const user= await  UserModel.findOne({email})

    if(user){
      res.status(400)
        .send('User is already exist, please login!');
        return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser:User={
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        address,
        isAdmin: false,
        
    }

    const savedUser = await UserModel.create(newUser);
    res.send(generateJwtToken(savedUser))

  
})
   
  

  
  
  router.post("/api/users/login", async(req,res)=>{
  
  
  const {email,password}=req.body
    
  
  
     const user= await UserModel.findOne({email})
  
     if(user && (await bcrypt.compare(password,user.password)))
       res.send(generateJwtToken(user))
      else
        res.status(400).send("username or password is not valid!")
  })
  
   const generateJwtToken=(user:User)=>{
  
  
  const token=jwt.sign({id:user.id,email:user.email,isAdmin:user.isAdmin
  
  
  },JWT_SECRET_KEY,{expiresIn:"30d"})
  
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token
  };
   }

//--------------------------------------------------------------------------------




//-------------------------------------Order Routes---------------------------------



router.post("/api/orders/create",async(req:any,res:any)=>{

    const order=req.body

    if(order.items.length<=0)
       res.status(400).send("Empty cart!!")
    
await OrderModel.deleteOne({
    user:req.user.id,status:OrderStatus.NEW})


    const newOrder=new OrderModel({...order,user:req.user.id})

    await newOrder.save()
    res.send(newOrder)
    



})



router.get('/api/orders/newOrderForUser',async(req:any,res:any)=>{



  const order= await OrderModel.findOne({
        user:req.user.id,status:OrderStatus.NEW
    })

    if(order)
        res.send(order)
    else
     res.status(400).send()
    
   

})

router.post('/api/orders/pay', async (req:any, res) => {
    const {paymentId} = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if(!order){
        res.status(400).send('Order Not Found!');
        return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
})

router.get('/api/orders/track/:id', async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    res.send(order);
})


async function getNewOrderForCurrentUser(req: any) {
    return await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
}

 export default router
