import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { Food } from '../shared/models/Food';
import { CartItem } from '../shared/models/CartItem';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // cart:Cart=new Cart();

  // using localstorage to avoid disappearing cart after page refresh
  private cart: Cart = this.getCartFromLocalStorage();
  cartSubject:BehaviorSubject<Cart>=new BehaviorSubject(this.cart);
  constructor() { }


  addToCart(food:Food){


    let cartItem=this.cart.items.find(item=>item.food.id===food.id)
   if(cartItem)
   return;

 
   this.cart.items.push(new CartItem(food))
   this.setCartToLocalStorage();
    
  }


  removeFromCart(foodId:string){

    this.cart.items=this.cart.items.filter(item=>item.food.id!=foodId)
this.setCartToLocalStorage();
  }

  changeQuantity(foodId:String,quantity:number){
   let cartItem=  this.cart.items.find(item=>item.food.id===foodId);
   if(!cartItem)
     return;

   cartItem.quantity=quantity
   cartItem.price=quantity*cartItem.food.price
    

   this.setCartToLocalStorage();
  }

  clearCart(){

    this.cart=new Cart();
    this.setCartToLocalStorage();
    
  }

  
  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  setCartToLocalStorage():void
{
  // reduce just reducr the result into a single value and jsut use accumulator, current value and intial value so current vaue will be the value of array and accumulator just store the result so here its like total=total+price for all price in cartItem entries
this.cart.totalPrice=this.cart.items.reduce((prev,currentItem)=>prev+currentItem.price,0)
this.cart.totalCount=this.cart.items.reduce((prev,currentItem)=>prev+currentItem.quantity,0)
this.cart.items.reduce((prev,currentItem)=>prev+currentItem.quantity,0)
this.cart.items.reduce((prev,currentItem)=>prev+currentItem.quantity,0)
const cartJson=JSON.stringify(this.cart)
localStorage.setItem('Cart',cartJson)
this.cartSubject.next(this.cart)


}

getCartFromLocalStorage(){

 const cart= localStorage.getItem('Cart')

 // this below will avoid disapperaing of cart when page refreshed as we are using local storage to get the cart and if cart empty then its returninga fresh cart object
 return cart?JSON.parse(cart):new Cart();


}

getCart():Cart{
  return this.cartSubject.value
}

}
