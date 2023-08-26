import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { UserLogin } from '../shared/interfaces/UserLogin';
import { IUserRegister } from '../shared/interfaces/UserRegister';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
  
})
export class UserService {

loginUrl="http://localhost:5000/api/users/login"
signupUrl="http://localhost:5000/api/users/signup"

private userSubject=new BehaviorSubject<User>(this.getUserFromLocalStorage());
// public loginStatusSubject=new Subject<boolean>();

public userObservable:Observable<User>

// @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>

  constructor(private http:HttpClient, private toastr:ToastrService) {

    this.userObservable=this.userSubject.asObservable()
   }



  loginUser(userLogin:UserLogin){

   return this.http.post<User>(this.loginUrl,userLogin).pipe(tap({
    next:(user)=>{
      this.toastr.success("You are logged In successfully!!");
      this.setUsertoLocalStorage(user) 

      //the reason why login username was not reflecting without refresh was i was not using userSubject.next(user) 
      // so only initializing it with localstorage value wouldn't trigger any change detection or notify subscribers.
      // so the below code is must to notify change to automatically detect it 
      this.userSubject.next(user)

      // using event emitter to modify navbar with login user name automatically without refreshing page
      // this.fireIsLoggedIn.next(user)
      
    },
    error:(errorResponse)=>{
      this.toastr.error("Invalid email or password,try again")
    
    }
   
  
    
   }))


  }

  setUsertoLocalStorage(user:User){



    localStorage.setItem('user',JSON.stringify(user))
  }

  getUserFromLocalStorage(){

    const userJson= localStorage.getItem('user')
    if(userJson)
    return JSON.parse(userJson) as User

    return new User();
  }

 get getCurrentUser():User{
   return this.userSubject.value

  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem('user')
    window.location.reload();


  }

  // getEmitter() { 
  //   return this.fireIsLoggedIn; 
  // } 

  isLoggedIn(){
    let tokenStr=localStorage.getItem('user');

    if(tokenStr==undefined || tokenStr==''|| tokenStr==null){
      return false
    }
    else{
      return true;
    }

  }

signupUser(user:IUserRegister){

  return this.http.post<User>(this.signupUrl,user).pipe(tap({

    next:(user)=> {

      this.setUsertoLocalStorage(user);
      this.userSubject.next(user) 
      
      console.log(user)
      this.toastr.success(
        `welcome ${user.name}`,
        'your are Registerd Successfully'
      )
             
    },
    error: (errorResponse) => {
      this.toastr.error(errorResponse.error,
        'Registeration Failed')
    }

  }))
}





}
