import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { LoginPayload } from '../models/login-payload';
import { SignupPayload } from '../models/signup-payload';
import Swal from 'sweetalert2'

const USERNAME_STORAGE_KEY: string = "username";
const TOKEN_STORAGE_KEY: string = "token";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl: string = "https://homesentry.azurewebsites.net/users";
  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  constructor(private http: HttpClient, private router: Router) { }

  public register(userInfo: SignupPayload): void {
    this.http.post<User>(`${this.apiUrl}/register`, { name: userInfo.name, username: userInfo.email, password: userInfo.password }, this.options).subscribe((response) => {
      this.saveToLocalStorage(response.name, response.token);
      this.goToHome();
    }, (error: HttpErrorResponse) => {
      if (error.status == 400) {
        Swal.fire(
          'Error',
          'Incorrect fields',
          'error'
        );
      }
      else if (error.status == 409) {
        Swal.fire(
          'Error',
          'This e-mail address is already in use. Please choose another one or log in',
          'error'
        );
      }
      else if (error.status == 500) {
        Swal.fire(
          'Error',
          'A server error occured',
          'error'
        );
      }
    });
  }

  public login(credentials: LoginPayload): void {
    this.http.post<User>(`${this.apiUrl}/authenticate`, { username: credentials.email, password: credentials.password }, this.options).subscribe((response) => {
      this.saveToLocalStorage(response.name, response.token);
      this.goToHome();
    }, (error: HttpErrorResponse) => {
      if (error.status == 400) {
        Swal.fire(
          'Error',
          'Invalid username or password!',
          'error'
        );
      }
      else if (error.status == 500) {
        Swal.fire(
          'Error',
          'A server error occured',
          'error'
        );
      }
    });
  }

  public isLogged(): boolean {
    return localStorage.getItem(USERNAME_STORAGE_KEY) !== null && localStorage.getItem(TOKEN_STORAGE_KEY) !== null
  }

  public disconnect(): void {
    localStorage.removeItem(USERNAME_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);

    this.goToLogin();
  }

  public goToLogin(): void {
    window.location.replace('/login');
  }

  public goToHome(): void {
    this.router.navigateByUrl('/');
  }

  public getJwt(): string | undefined {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }

  public getName(): string | undefined {
    return localStorage.getItem(USERNAME_STORAGE_KEY);
  }

  saveToLocalStorage(username: string, token: string) {
    localStorage.setItem(USERNAME_STORAGE_KEY, username);
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  }
}
