import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HealthService {

  constructor(private http: HttpClient) { }

  rootURL = environment.baseUrl;

  login(user: any) {
    return this.http.post(this.rootURL + '/users/login', user).pipe(catchError(this.handleError));
  }

  register(user: any) {
    return this.http.post(this.rootURL + '/users/register', user);
  }

  getPatientHealthInfo() {
    return this.http.get(this.rootURL + '/users/patientHealthInfo');
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
      console.log(msg);
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log(msg);
      alert(error.message);
    }
    return throwError(msg);
  }
}
