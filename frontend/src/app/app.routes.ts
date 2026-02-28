import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register} from './auth/register/register'; 
import { Dashboard } from './dashboard/dashboard';
import { Firstpage } from './firstpage/firstpage';

export const routes: Routes = [
 { path: '', redirectTo: 'firstpage', pathMatch: 'full' },
 { path: 'login', component: Login },      
 { path: 'register', component: Register },
 {path:'dashboard', component:Dashboard},
 {path:'firstpage', component:Firstpage}
];
