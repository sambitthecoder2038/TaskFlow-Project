import { Component, inject } from '@angular/core';
import { FormBuilder,ReactiveFormsModule,Validators } from '@angular/forms';
import { Auth } from '../../service/auth';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Toastify from 'toastify-js';

@Component({
 selector: 'app-login',
 standalone: true,
 imports: [CommonModule,ReactiveFormsModule,RouterLink],
 templateUrl: './login.html',
 styleUrl: './login.css',
})
export class Login {
 fb = inject(FormBuilder);
 router = inject(Router)
 auth = inject(Auth);
 form = this.fb.group({
   email:['', [Validators.required,Validators.email]],
   password:['',[Validators.required]]
 });
 login(){
  
   this.auth
     .login({
       
email: this.form.value.email,   // MUST be "email"
 password: this.form.value.password

     })
     .subscribe({
       next: (res: any) => {
         // 🔐 Save JWT token
         this.auth.saveToken(res.token);

         // 🧑 Save user name for navbar
         localStorage.setItem('name', res.name || 'User');

          Toastify({
            text: "Login Successful 🎉",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#28a745",
          }).showToast();

         // 🔁 Redirect to dashboard
         this.router.navigate(['/dashboard']);
       },

       error: () => {
        Toastify({
            text: "Invalid Email or Password ❌",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#dc3545",
          }).showToast();
       },
     });
 
 }
}
