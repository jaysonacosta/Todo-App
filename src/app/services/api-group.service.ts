import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiGroupService {
  apiHost = environment.apiHost;

  constructor(private http: HttpClient) {}

  getAllGroups(): Observable<Group[]> {
    return this.http
      .get<Group[]>(`${this.apiHost}/group`)
      .pipe(retry(2), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}

export interface Group {
  _id: string;
  title: string;
  meta: {
    pinned: boolean;
  };
  createdAt: string;
  selected: boolean;
}
