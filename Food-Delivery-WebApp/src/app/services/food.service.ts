import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'src/data';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  foodUrl='http://localhost:5000/api/food'
  constructor(private http:HttpClient) { }

  getAll():Observable<Food[]>{
  
    return this.http.get<Food[]>(`${this.foodUrl}/`)

  }


  getAllFoodBySearchTerm(searchTerm:String):Observable<Food[]>{

    return this.http.get<Food[]>(`${this.foodUrl}/search/`+searchTerm)
    // return this.getAll().filter(food=>food.name.toLowerCase().includes(searchTerm.toLowerCase()))

  }

  getAllTags():Observable<Tag[]>{
    
    return this.http.get<Tag[]>(`${this.foodUrl}/tags`)
    
  }

  getFoodByTag(tag:string):Observable<Food[]>{
    return tag==='All'? this.getAll():this.http.get<Food[]>(`${this.foodUrl}/tag/`+tag)
    
    
    // return tag==='All'? this.getAll(): this.getAll().filter((food)=> food.tags?.includes(tag))


  }

  getFoodById(foodId:string):Observable<Food>{

    return this.http.get<Food>(`${this.foodUrl}/`+foodId)
 

  }
}
