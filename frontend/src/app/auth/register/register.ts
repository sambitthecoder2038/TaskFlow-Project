import { Component, inject } from '@angular/core';
import {
FormBuilder,
ReactiveFormsModule,
Validators,
AbstractControl,
ValidationErrors
} from '@angular/forms';
import { Auth } from '../../service/auth';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import Toastify from 'toastify-js';

function passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
const password = group.get('password')?.value;
const confirm = group.get('confirmPassword')?.value;

if (!password || !confirm) return null;

return password === confirm ? null : { passwordMismatch: true };
}

@Component({
selector: 'app-register',
standalone: true,
imports: [CommonModule, ReactiveFormsModule , RouterLink],
templateUrl: './register.html',
styleUrl: './register.css'
})
export class Register {

fb = inject(FormBuilder);
auth = inject(Auth);
router = inject(Router);

form = this.fb.group(
  {
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  },
  { validators: passwordsMatchValidator }
);

register() {
   if (this.form.invalid) {
     this.form.markAllAsTouched();
     return;
   }

  
   const { confirmPassword, ...payload } = this.form.value as any;
   console.log(payload);
   
  this.auth.register(payload)
     .subscribe(
       (res: any) => {
         
         Toastify({
                     text: "Register Successful 🎉",
                     duration: 3000,
                     gravity: "top",
                     position: "right",
                     backgroundColor: "#28a745",
                   }).showToast();
                   
         this.router.navigate(['/login']);
       },
       (err: any) => {
         
         Toastify({
            text: "Register Failed ❌",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#dc3545",
          }).showToast();
         this.router.navigate(['/register']);
         console.log(err);
       }

     );
 }

}
