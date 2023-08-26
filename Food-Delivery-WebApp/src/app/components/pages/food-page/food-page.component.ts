import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {


  food!:Food
constructor(private activateRoute:ActivatedRoute, private foodService:FoodService, private cartService:CartService, private router:Router){



}

  ngOnInit(): void {
this.activateRoute.params.subscribe(params=>{

  if(params['foodId'])
  this.foodService.getFoodById(params['foodId']).subscribe({
    next:(data)=>{
     this.food=data;
      
      console.log( typeof(data));
  
    }
    ,error:(error)=>{
  console.log(error)
    },
    complete:()=>{
 console.log("completed")
    }
  })
  //  this.food=this.foodService.getFoodById(params['foodId'])

})
  }

addFoodToCart(){
this.cartService.addToCart(this.food)
this.router.navigate(['/cart-page'])
}

}
