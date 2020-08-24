import { Component, OnInit } from '@angular/core';
import feather from 'feather-icons';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    feather.replace();
  }

  logout(): void {
    this.authService.disconnect();
  }
}
