import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HomeSentry';

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    this.router.events.subscribe((event: any): void => {
      if (event instanceof NavigationStart && !event.url.startsWith('/signup') && !event.url.startsWith('/login')) {
        if (!this.authService.isLogged())
          this.authService.goToLogin();
      }
    });
  }
}
