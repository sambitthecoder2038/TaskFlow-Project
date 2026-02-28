import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
 selector: 'app-firstpage',
 standalone:true,
 imports: [],
 templateUrl: './firstpage.html',
 styleUrl:'./firstpage.css'
})
export class Firstpage {

 private router = inject(Router)
 register(){
   this.router.navigate(['/register']);
 }
 login(){
   this.router.navigate(['/login']);
 }
   
}
