import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HealthService } from 'src/app/services/health/health.service';


@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup |any;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private healthService: HealthService,
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.isLoggedIn) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            userName: ['', Validators.required],
            userEmail: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            passwordConfirmation: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        console.log('this.registerForm.value==========',this.registerForm.value)
        this.healthService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    alert('Registration successful');
                    this.router.navigate(['/login']);
                },
                error => {
                    alert(error);
                    this.loading = false;
                });
    }
}
