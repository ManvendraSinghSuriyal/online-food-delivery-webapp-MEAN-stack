import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SignupComponent } from '../../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit{


  @ViewChild('exampleModal') modal!: ElementRef

  @ViewChild(SignupComponent) signupComponent!:SignupComponent
  display:string='none'

returnUrl:string=''
loginForm!:FormGroup 
isSubmitted=false;

constructor(private userService:UserService, 
  private fb:FormBuilder, private router:Router,
  private activateRoute:ActivatedRoute,
  private renderer: Renderer2){



}
  ngAfterViewInit(): void {
    const closeButton = this.modal.nativeElement.querySelector('.btn-close');
    this.renderer.setAttribute(closeButton, 'data-bs-dismiss', 'modal');
    console.log("reached")
  }

  ngOnInit(): void {
   this.loginForm= this.fb.group({

      email:['',[Validators.required]],
      password:['',Validators.required]
    })

    this.returnUrl=this.activateRoute.snapshot.queryParams['returnUrl']

  }


  get fc(){
    return this.loginForm.controls
  }



submitForm(){
this.isSubmitted=true;
  if(this.loginForm.invalid)
   return;
     
   this.userService.loginUser({email:this.fc['email'].value,password:this.fc['password'].value}).subscribe(()=>{
        
    this.router.navigateByUrl(this.returnUrl)
   })

   

}

closeModal(){
  // this.dismissModal=true;
  this.signupComponent.resetForm();
  
}


openSignup(){

this.display='block';

}
}