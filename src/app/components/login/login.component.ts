import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HealthService } from 'src/app/services/health/health.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  loading = false;
  submitted = false;
  returnUrl: string | any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private healthService: HealthService
  ) {
    this.loading = false;
    // redirect to home if already logged in
    if (this.authenticationService.isLoggedIn) {
      this.router.navigateByUrl('/');
    }
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['chaitanya@mailinator.com', Validators.required],
      password: ['abc@123', Validators.required]
    });

    // get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.queryParams['/'];
  }

  login(user: any) {
    console.log('on login');
    this.healthService.login(user).subscribe((result: any) => {
      if (!result && result.data) {
        this.router.navigateByUrl('/login');
      }
      console.log('user::::', result);
      localStorage.setItem('user', JSON.stringify(result.data))
      this.router.navigateByUrl('');
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.healthService.login({ username: this.f.username.value, password: this.f.password.value })
      .pipe(first())
      .subscribe(
        (result: any) => {
          alert('Login successful');
          console.log('user::::', result);
          localStorage.setItem('user', JSON.stringify(result.data))
          this.router.navigate(['']);
        },
        error => {
          alert(error);
          this.loading = false;
        });
  }

  openRegister(){
    console.log('inner open register');
    
    this.router.navigate(['register']);
  }

}
