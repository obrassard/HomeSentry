import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layouts/login/login.component';
import { HomeComponent } from './layouts/home/home.component';
import { VideoThumbnailComponent } from './components/video-thumbnail/video-thumbnail.component';
import { SignupComponent } from './layouts/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VideoDetailsComponent } from './layouts/video-details/video-details.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    VideoThumbnailComponent,
    SignupComponent,
    NavbarComponent,
    VideoDetailsComponent,
    VideoPlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
