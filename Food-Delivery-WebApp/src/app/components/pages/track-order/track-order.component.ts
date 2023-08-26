import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css'],
  animations: [
    trigger('statusChange', [
      state('loading', style({ opacity: 0.5 })),
      state('*', style({ opacity: 1 })),
      transition('* => loading', animate('300ms ease-in')),
      transition('* => *', animate('300ms ease-in'))
    ])
  ]
})
export class TrackOrderComponent implements OnInit{

  order!:Order;
  statusArray!:string[];
  currentStatus!: string;
  currentState = '*';
  constructor(private activatedRoute: ActivatedRoute,
              private orderService:OrderService) {
    

  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(!params['orderId']) return;

    this.orderService.trackOrderById(params['orderId']).subscribe(order => {
      this.order = order;
    })

    this.orderService.getOrderStatusUpdates().subscribe(statusArray => {
      this.statusArray = statusArray;
      this.updateStatus();
    });

  }


  updateStatus() {
    this.currentStatus = this.statusArray[this.statusArray.length - 1];
    this.currentState = 'loading';
    setTimeout(() => {
      this.currentState = '*';
    }, 300);
  }

  getStatusIconClass(status: string) {

    // console.log(status.toLowerCase().replace(' ','-'))
    return status.toLowerCase().replaceAll(' ', '-');
  }

}
