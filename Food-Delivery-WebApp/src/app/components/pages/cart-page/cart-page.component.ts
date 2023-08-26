import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent  implements OnInit{
  
  cart!:Cart
  
  constructor(private cartService:CartService){
    

    
  }
  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((cart)=>
    this.cart=cart)
  }

  removeFromCart(cartItem:CartItem){

    this.cartService.removeFromCart(cartItem.food.id)
  }

  changeQuantity(cartItem:CartItem,quantityInString:string){
    let quantity=parseInt(quantityInString);

    this.cartService.changeQuantity(cartItem.food.id,quantity)
  }

}
