import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import feather from 'feather-icons';
import { ValidationService } from '../../services/validation.service';
import { SignupPayload } from '../../models/signup-payload';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    public userData: SignupPayload = {
        email: '',
        password: '',
        name: '',
        confirmation: ''
    };

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('emailInput') emailInput: ElementRef;
    @ViewChild('passwordInput') passwordInput: ElementRef;
    @ViewChild('confirmInput') confirmInput: ElementRef;

    constructor(private validation: ValidationService, private authService: AuthenticationService) { }

    ngOnInit(): void {
        feather.replace();
    }

    onClick(): void {
        if (!this.userData.name) {
            this.nameInput.nativeElement.focus();
        } else if (!this.validation.validateEmail(this.userData.email)) {
            this.emailInput.nativeElement.focus();
        } else if (!this.userData.password) {
            this.passwordInput.nativeElement.focus();
        } else if (!this.userData.confirmation) {
            this.confirmInput.nativeElement.focus();
        } else {
            this.authService.register(this.userData);
        }
    }
}


