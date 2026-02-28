import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
 providedIn: 'root',
})
export class Auth {

 private http = inject(HttpClient);
 private API = "http://localhost:8080/api/auth";
   // userName = 'User';
 // private USERS_KEY = "users";

 // private TOKEN_KEY = "token";

 register(data: any) {


   return this.http.post(this.API + '/register', data);


 }

 login(data: any) {

   return this.http.post(this.API + '/login', data);
 }

 saveToken(token: string) {
   localStorage.setItem('token', token);
   // const name = localStorage.getItem('name');
   // if (name) this.userName = name;
 }

 logout() {
   localStorage.removeItem('token');
   localStorage.removeItem('name')
 }

}

