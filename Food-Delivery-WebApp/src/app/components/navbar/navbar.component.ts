import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent  implements OnInit {

  isLoggedIn: boolean = false;
  totalQuantity:number=0

  user!:User
  constructor(private cartService:CartService,
     public userService:UserService, 
     private cdr: ChangeDetectorRef,
     private ngZone:NgZone){}
 
  ngOnInit(): void {

    //the reason why login username was not reflecting without refresh was i was not using userSubject.next(user) 
      // so only initializing it with localstorage value wouldn't trigger any change detection or notify subscribers.
      // so userSubject.next(user) is required in userService inside the loginuser method so that it would put a new value inside behvaiour subject so that it can notify changes and automatically modify dom without refresh
    this.userService.userObservable.subscribe((newUser)=>{
      
      this.isLoggedIn=this.userService.isLoggedIn()
      this.user=newUser
    })


    

  
  
  
    this.cartService.getCartObservable().subscribe((cart)=>
    this.totalQuantity=cart.totalCount)


   

 


    // subscribing getEmitter for getting user value in the event emitter and using this it will ntoify component that changes occur so refrlect it
    // above userObservable approach was not automatically changing without refresh  
    // this.userService.getEmitter().subscribe((user)=>{
    //     this.user=user
    //     this.isLoggedIn=!!user?.token
    //     console.log(this.user)

    //     console.log("Component is notified of successfull login!");
    //   })
    
 
  }


  logout(){
    this.userService.logout()

  }

  get isAuth(){
    return !!this.user?.token
  }

}
