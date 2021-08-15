import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'health';
  currentUser: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.isLoggedIn ? this.authenticationService.isLoggedIn : undefined;
    console.log('this.currentUser ====>', this.currentUser);
  }
  onRouterActivate(event: any) {
    console.log('event=======', event, '             this.router.url     ====>', this.router.url);
    this.currentUser = this.authenticationService.isLoggedIn;
    console.log('onRouterActivate this.currentUser ====>', this.currentUser);
    /* if (!localStorage.getItem('user')) {
      console.log('inner log out');
      this.router.navigateByUrl('/login');
    } */
  }

  logout() {
    this.authenticationService.logout()
  }
}
