import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private router: Router, private http: HttpClient) {
        let user = localStorage.getItem('user')
        console.log('=========user : ', user)
        this.currentUserSubject = new BehaviorSubject<any>(user !== null ? JSON.parse(user) : undefined);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    public get isLoggedIn(): any {
        let user = localStorage.getItem('user')
        return user !== null ? JSON.parse(user) : undefined;
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.router.navigateByUrl('/login');
        this.currentUserSubject.next(null);

    }
}