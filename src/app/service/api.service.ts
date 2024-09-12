import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private router: Router) { }


  _postData(payload: any, path: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + path,payload)
        .pipe(retry(0), catchError(this.errorHandl));
  };

  errorHandl(err: any) {
    //console.log(err);

    let error: any = '';
    if (err.error instanceof ErrorEvent) {
      error = err.error.message;
    } else {
      error = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    return throwError(() => error)
  }
}
