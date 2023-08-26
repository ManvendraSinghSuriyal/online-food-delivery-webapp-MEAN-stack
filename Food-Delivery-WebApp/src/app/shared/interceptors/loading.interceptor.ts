import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {


  pendingRequest=0;
  constructor(private loadingService:LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    this.loadingService.showLoading()
    this.pendingRequest=this.pendingRequest+1;
    return next.handle(request).pipe(tap({
  next:(event)=>{

    if(event.type===HttpEventType.Response){
    
     this.handleHideLoading()
    }
  },
  error:(_)=>{
    this.handleHideLoading()
  }

    }))
  }


  handleHideLoading(){
    this.pendingRequest=this.pendingRequest-1
    if(this.pendingRequest===0)
     this.loadingService.hideLoading()

  }
}
