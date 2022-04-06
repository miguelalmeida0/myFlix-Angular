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

        /** This will make an api call to the user registration endpoint
     * @funtion userRegistration
     * @param userDetails
     * @returns the user object in a json format
     */

        public userRegistration(userDetails: any): Observable<any> {
          console.log(userDetails);
          return this.http.post(apiUrl + 'users', userDetails).pipe(
          catchError(this.handleError)
        );
      }


        /** Make api call to the user login endpoint
     * @funtion userLogin
     * @param userDetails
     * @returns the user data in a json format
     */

        public userLogin(userDetails: any): Observable<any> {
          console.log(userDetails);
          return this.http.post(apiUrl + 'login', userDetails).pipe(
            catchError(this.handleError)
        );
      }


          /** This will make an API call in order to return all the movies
     * @funtion getMovies
     * @returns the full array of movies
     */

      getMovies(): Observable<any> {
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

            /** This will make an API call in order to return one single movie
       * @funtion getOneMovie
       * @returns one single movie
       */

          getOneMovie(): Observable<any> {
            const token = localStorage.getItem('token');
            return this.http.get(apiUrl + 'movies/:Title', {
              headers: new HttpHeaders({
                Authorization: 'Bearer ' + token
              })
            }).pipe(
              map(this.extractResponseData),
              catchError(this.handleError)
            );
          }


        /** This will make an API call in order to return the director name
     * @funtion getDirector
     * @returns the director name
     */

      getDirector(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'director/:Name', {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
          })
        }).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
      }


        /** This will make an API call in order to return a movie genre
     * @funtion getGenre
     * @returns the genre of a movie
     */

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


        /** This will make an API call in order to return the user profile
     * @funtion getUserProfile
     * @returns the user profile
     */

      getUserProfile(): Observable<any> {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');
        return this.http
          .get(apiUrl + `users/${username}`, {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + token,
            }),
          })
          .pipe(map(this.extractResponseData), catchError(this.handleError));
      }


        /** This will return the users favorite movie
     * @funtion getFavouriteMovies
     * @returns the user favorite movies list
     */

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


          /** This will add a movie to the favorites
     * @funtion addFavouriteMovie
     * @returns the user favorite movies lists
     */

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

      public getUser(Username: any): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http
          .get(apiUrl + `/users/${Username}`, {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + token,
            }),
          })
          .pipe(map(this.extractResponseData), catchError(this.handleError));
      }


      /** API call to edit the user profile
     * @funtion editUserProfile
     * @returns new update user data
     */

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


      /**
     * call api endpoint to delete the current user
     * @param username
     * @returns delete user profile
     */

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

      /**
     * call api endpoint to delete a favorite movie from the users favorite list
     * @param movieId {any}
     * @returns updated user's information after removed a movie from the list in json format
     */

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