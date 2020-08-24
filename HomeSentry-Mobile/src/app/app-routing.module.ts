import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './layouts/login/login.component';
import { CameraComponent } from './camera/camera.component';
import { SignupComponent } from './layouts/signup/signup.component';
import { HomeComponent } from './layouts/home/home.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'camera/:name', component: CameraComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
