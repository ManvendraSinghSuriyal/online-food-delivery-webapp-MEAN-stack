import mongoose, { Schema, model } from "mongoose";

export interface User{
    id?:string;
    email:string;
    name:string;
    password:string;
    isAdmin:boolean;
    address:string;
   

}

export const UserSchema=new Schema<User>({

    email:{type:String,required:true},
    name:{type:String,required:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,required:true},
    address:{type:String,required:true},



}
,{
    toJSON: { virtuals: true },    // Include virtual properties when converting to JSON
    toObject: { virtuals: true },  // Include virtual properties when converting to plain objects
    timestamps: true              // Automatically manage createdAt and updatedAt fields
}


)

export const UserModel=model<User>('user', UserSchema)

