import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

order:Order=new Order()
checkoutForm!:FormGroup

constructor(private userService:UserService,
  private cartService:CartService,
  private fb: FormBuilder,
  private toastr:ToastrService,
  private orderService:OrderService,
  private router:Router){

   const cart=this.cartService.getCart()

    this.order.items=cart.items
    this.order.totalPrice=cart.totalPrice
    

}
ngOnInit(): void {

  const {name,address}=this.userService.getCurrentUser
  this.checkoutForm=this.fb.group({
   name:[name,Validators.required],
   address:[address,Validators.required]

  });

}


createOrder(){

  if(this.checkoutForm.invalid){
  this.toastr.warning("please add value input field details!!")
  return;}

  this.order.name=this.checkoutForm.get('name')?.value
  this.order.address=this.checkoutForm.get('address')?.value

  console.log(this.order)
  if(!this.order.addressLatLng){
  this.toastr.warning("please provide your location on map",'Location')
  return;
  }

  this.orderService.createOrder(this.order).subscribe({
    next:()=>{
  this.router.navigate(['/payment'])
    },
    error:(errorResponse)=>{
      this.toastr.error(errorResponse.error,'Cart')
    }
  })


}

}
