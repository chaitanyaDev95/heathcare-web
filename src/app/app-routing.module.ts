import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './services/authentication/auth.guard';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./components/health/health.module').then(m => m.HealthModule),
      data: { title: 'Dashboard ', preload: true},
      canActivate: [AuthGuard] 
  },
  {
    path: 'login',component: LoginComponent
  },
  {
    path: 'register',component: RegisterComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule 
  ],
  declarations: [
    LoginComponent
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
