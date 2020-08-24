import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import feather from 'feather-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('nameInput') nameInput: ElementRef;

  public name: string;
  public username: string;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    feather.replace();
    this.username = this.authService.getName();
  }

  onClick(): void {
    console.log(this.name);
    if (!this.name) {
      this.nameInput.nativeElement.focus();
    } else {
      this.router.navigate(['/camera', encodeURIComponent(this.name)])
    }
  }

}
