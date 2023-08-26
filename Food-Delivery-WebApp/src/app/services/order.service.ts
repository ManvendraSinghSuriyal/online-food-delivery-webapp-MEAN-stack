import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import { Observable, interval, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderUrl='http://localhost:5000/api/orders'

  private orderStatuses:string[]= [
    'Ordered',
    'Cooking',
    'Packed',
    'Out for Delivery',
    'Delivered',
  ];

  constructor(private http:HttpClient) {




   }



   createOrder(order:Order){
   return this.http.post<Order>(`${this.orderUrl}/create`,order)
   }

   getOrderStatusUpdates(): Observable<string[]> {
    return interval(5000).pipe(
      map(index => this.orderStatuses.slice(0, index + 1)),
      take(this.orderStatuses.length)
    );
  }


   getOrderForCurrentUser(){
   return this.http.get<Order>(`${this.orderUrl}/newOrderForUser`)
   }



   pay(order:Order):Observable<string>{
    return this.http.post<string>(`${this.orderUrl}/pay`,order);
  }

  trackOrderById(id:number): Observable<Order>{
    return this.http.get<Order>( `${this.orderUrl}/track/`+id);
  }
}
