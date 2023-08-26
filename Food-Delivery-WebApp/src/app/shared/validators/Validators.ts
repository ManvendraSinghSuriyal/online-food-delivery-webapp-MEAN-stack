import { AbstractControl } from "@angular/forms";

export const PasswordsMatchValidator=(passwordControlName: string,
    confirmPasswordControlName: string)=>(control:AbstractControl)=>{
        const validator = (form: AbstractControl) => {
            
          const passwordControl =  form.get(passwordControlName);
          const confirmPasswordControl =  form.get(confirmPasswordControlName);
  
          if(!passwordControl || !confirmPasswordControl) return;
  
          if(passwordControl.value !== confirmPasswordControl.value){
            confirmPasswordControl.setErrors({notMatch: true});
          }else{
            const errors = confirmPasswordControl.errors;
            if(!errors) return;
  
            delete errors["notMatch"];
            confirmPasswordControl.setErrors(errors);
          }
        }
        return validator;
      }




    export const passwordMatchValidator= (control: AbstractControl)=>{
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');
    
        if(!password || !confirmPassword) return;
        if (password && confirmPassword && password.value !== confirmPassword.value) {
          confirmPassword.setErrors({ passwordMismatch: true });
        } else {
          confirmPassword?.setErrors(null);
        }
    
        return null;
      }