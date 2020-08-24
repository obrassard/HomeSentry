import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import feather from 'feather-icons';
import { ValidationService } from '../../services/validation.service';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginPayload } from '../../models/login-payload';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public credentials: LoginPayload = {
        email: '',
        password: ''
    };

    constructor(private validation: ValidationService, private authService: AuthenticationService) { }

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('passwordInput') passwordInput: ElementRef;

    ngOnInit(): void {
        feather.replace();
    }

    onClick(): void {
        if (!this.validation.validateEmail(this.credentials.email)) {
            this.nameInput.nativeElement.focus();
        } else if (!this.credentials.password) {
            this.passwordInput.nativeElement.focus();
        } else {
            this.authService.login(this.credentials);
        }
    }
}
