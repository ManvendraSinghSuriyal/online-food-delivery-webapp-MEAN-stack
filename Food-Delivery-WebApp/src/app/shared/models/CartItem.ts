import { Food } from "./Food";

export class CartItem{

    constructor(public food:Food){}

    public quantity:number=1
    public price=this.food.price


}