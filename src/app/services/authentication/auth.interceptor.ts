import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    /*  intercept(request: HttpRequest<any>, next: HttpHandler): HttpRequest<any> {
         // add authorization header with jwt token if available
         let currentUser = this.authenticationService.currentUserValue;
         console.log('===AuthInterceptor====',currentUser)
         
         if (currentUser && currentUser.token) {
             return request.clone({headers: request.headers.set('Authorization' ,`${currentUser.token}`)});
         }
 
         return next.handle(request);
     } */

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        const user  = this.authenticationService.isLoggedIn;
        console.log('===AuthInterceptor====', user)
        if (user) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", user.token)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}