import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { catchError, map, Observable, retry } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  errorHandl:any;
  constructor(private http: HttpClient, private router: Router) { }


  _postData(payload: any, path: any): Observable<any> { 
    return this.http.post<any>(environment.apiUrl + path,payload)
        .pipe(retry(0), catchError(this.errorHandl));
  };
}
