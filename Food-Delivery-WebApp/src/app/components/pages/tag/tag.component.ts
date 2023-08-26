import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  tags?:Tag[]

  constructor(private foodService:FoodService){

  
  }
  ngOnInit(): void {

    this.foodService.getAllTags().subscribe(
      {
        next:(data)=>{
         this.tags=data;
          
          console.log(data);
      
        }
        ,error:(error)=>{
      console.log(error)
        },
        complete:()=>{
     console.log("completed")
        }
      }
    )
    // this.tags=this.foodService.getAllTags();
  }
  

}
