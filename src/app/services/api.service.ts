import { Observable,  of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

const apiGetUrl = 'https://jsonplaceholder.typicode.com/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { 

  }

  //get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(apiGetUrl)
    .pipe(
      tap(heroes => console.log('Fetched products')),
      catchError(this.handleError('getProducts', []))
    );
  }

  //error handler
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //TODO: send to a log server
      console.error(error);

      return of(result as T);
    };
  }
}
