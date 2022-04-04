    import { Injectable } from '@angular/core';
    import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
    import { Observable, throwError, catchError } from 'rxjs';
    import { map } from 'rxjs/operators';
    import { Router } from '@angular/router';


    //Declaring the api url that will provide data for the client app
    const apiUrl = 'https://driveindb.herokuapp.com/';

    const token = localStorage.getItem('token');

    const username = localStorage.getItem('username');

    @Injectable({
      providedIn: 'root'
    })

    export class FetchApiDataService {
      constructor(private http: HttpClient, private router: Router) {
      }

    // Making the api call for the user registration endpoint
      public userRegistration(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http.post(apiUrl + 'users', userDetails).pipe(
        catchError(this.handleError)
      );
    }


    // This will allow the user to login.

      public userLogin(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http.post(apiUrl + 'login', userDetails).pipe(
          catchError(this.handleError)
      );
    }


    // This will get all the app movies.

    getAllMovies(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }


    // This will get a single movie.

    getOneMovie(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }


    // This will get the movie director name.

    getDirector(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'directors/:name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }


    // This will get the movie genre.

    getGenre(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'genres/:name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }


    // This will get to the user profile.

    getUserProfile(): Observable<any> {
      const token = localStorage.getItem('token');
      const UserID = localStorage.getItem('UserID');
      return this.http
        .get(apiUrl + `users/${UserID}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError));
    }


    // This will send back the favourite movies component.

    getFavouriteMovies(username: any): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }).pipe(
        map(this.extractResponseData), catchError(this.handleError)
      );
    }


    // This will add a favourite movie to the user movie list.

    addFavouriteMovie(movieId: any): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      return this.http.post(apiUrl + `users/${username}/movies/${movieId}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      }).pipe(
        map(this.extractResponseData), catchError(this.handleError)
      );
    }


    // This will edit a user favourite profile.

    editUserProfile(userData: object): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      return this.http.put(apiUrl + `users/${username}`, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }).pipe(
        map(this.extractResponseData), catchError(this.handleError)
      );
    }


    // This will delete a user profile.

    public deleteUserProfile(): Observable<any> {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('username');
      return this.http
        .delete(apiUrl + `users/${username}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError)
      );
    }

    // This will delete a user favourite movie.

    deleteFavouriteMovie( movieId: any): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      return this.http.delete(
        apiUrl + `users/${username}/movies/${movieId}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          })
        }).pipe(
          map(this.extractResponseData), catchError(this.handleError)
      );
    }

      // Extract data response 
    private extractResponseData(data: any | Object): any {
      return data || {};
    }

    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
        console.error('Some error occurred:', error.error.message);
        } else {
        console.error(
            `Error Status code ${error.status}, ` +
            `Error body is: ${error.error}`);
        }
        return throwError(
        'Something bad happened; please try again later.');
      }
    }