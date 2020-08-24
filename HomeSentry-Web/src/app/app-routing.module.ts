import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './layouts/login/login.component';
import { HomeComponent } from './layouts/home/home.component';
import { SignupComponent } from './layouts/signup/signup.component';
import { VideoDetailsComponent } from './layouts/video-details/video-details.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'detail/:id', component: VideoDetailsComponent },
  { path: '**', component: HomeComponent },
  // { path: '**', component: ClientPanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
