import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   foods:Food[] | undefined

constructor(private foodService:FoodService, private activeteRoute:ActivatedRoute){}
  
  ngOnInit(): void {

    this.activeteRoute.params.subscribe((params)=>{
      if(params['searchTerm'])
      this.foodService.getAllFoodBySearchTerm(params['searchTerm']).subscribe(
        {
          next:(data)=>{
           this.foods=data;
            
            console.log(data);
        
          }
          ,error:(error)=>{
        console.log(error)
          },
          complete:()=>{
       console.log("completed")
          }
        })
      // this.foods=this.foodService.getAllFoodBySearchTerm(params['searchTerm'])
      else if(params['tag'])
      this.foodService.getFoodByTag(params['tag']).subscribe( {
        next:(data)=>{
         this.foods=data;
          
          console.log(data);
      
        }
        ,error:(error)=>{
      console.log(error)
        },
        complete:()=>{
     console.log("completed")
        }
      })
      // this.foods=this.foodService.getFoodByTag(params['tag'])
      else
      this.foodService.getAll().subscribe({
        next:(data)=>{
         this.foods=data;
          
          console.log(data);
      
        }
        ,error:(error)=>{
      console.log(error)
        },
        complete:()=>{
     console.log("completed")
        }
      })
    //  this.foods=this.foodService.getAll()
    })



    
 
  }

}
