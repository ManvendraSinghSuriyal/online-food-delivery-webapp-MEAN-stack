import { verify } from "jsonwebtoken"
import { JWT_SECRET_KEY } from "../constants/jwt_secretkey"

export default (req:any,res:any,next:any)=>{

const token=req.headers.auth_token as string

if(!token)
  res.status(401).send()


  try{

  const decryptedUser=verify(token,JWT_SECRET_KEY)

  req.user=decryptedUser

  }
  catch{

    res.status(401).send()
  }

  return next()

}