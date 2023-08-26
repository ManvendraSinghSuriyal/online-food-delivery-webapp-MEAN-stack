import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

import { IUserRegister } from 'src/app/shared/interfaces/UserRegister';
import { PasswordsMatchValidator, passwordMatchValidator } from 'src/app/shared/validators/Validators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  // user: User = new User;
  regForm!:FormGroup
  isSubmitted=false
  returnUrl=''

  constructor(private userService:UserService, private fb:FormBuilder,
     private activatedRoute:ActivatedRoute,private router: Router){


  }
  ngOnDestroy(): void {
   this.regForm.reset();
  }
  ngOnInit(): void {
    this.regForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(10)]]
    },{
      // validators: PasswordsMatchValidator('password','confirmPassword')
      validators:passwordMatchValidator
    });

    this.returnUrl= this.activatedRoute.snapshot.queryParams['returnUrl'];

  }

 
resetForm(){
  this.regForm.reset()
}


  submitForm(){

this.isSubmitted=true;

if(this.regForm.invalid)
return;

const fv=this.regForm.value;
const user:IUserRegister={

  name: fv.name,
  email:fv.email,
  password:fv.password,
  confirmPassword:fv.confirmPassword,
  address:fv.address

};


this.userService.signupUser(user).subscribe(_=>{
  this.router.navigateByUrl(this.returnUrl)
})



  }



  // resetForm() {
  //   this.user = {
  //     id:'',
  //     name: '',
  //     password: '',
  //     email: '',
  //     address: '',
  //     isAdmin:false,
  //     token:''
  //   };
  // }
}
