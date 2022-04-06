import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';



@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  user: any = localStorage.getItem('user');
  movies: any[] = [];
  genres: any[] = [];
  favouriteMovies: any [] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
   ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavouriteMovies();
  }

getMovies(): void {
  this.fetchApiData.getMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      panelClass: 'custom-dialog-container',
      data: { name, description },
      width: '500px'
    });
  }

  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorViewComponent , {
      panelClass: 'custom-dialog-container',
      data: {name, bio},
      width: '500px',
    });
  }

  getFavouriteMovies(): void {
    this.fetchApiData.getUserProfile().subscribe((resp: any) => {
      this.favouriteMovies = resp.FavouriteMovies;
      console.log(this.favouriteMovies);
    });
  }

  addFavouriteMovie(movieId: string, title: string): void {
    this.fetchApiData.addFavouriteMovie(movieId).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your favourites!`, 'OK', {
        duration: 3000,
      });
      this.ngOnInit();
    });
    return this.getFavouriteMovies();
  }

  removeFavouriteMovie(movieId: string, title: string): void {
    this.fetchApiData.deleteFavouriteMovie(movieId).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `${title} has been removed from your favourites!`,
        'OK',
        {
          duration: 3000,
        }
      );
      this.ngOnInit();
    });
    return this.getFavouriteMovies();
  }
}