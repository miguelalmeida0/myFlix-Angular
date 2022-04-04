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
    this.getGenre();
    this.getFavouriteMovies();
  }

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getGenre(): void {
    this.fetchApiData.getGenre().subscribe((resp: any) => {
        this.genres = resp;
        console.log(this.genres);
        return this.genres;
      });
  }

  openDirector(name: string, bio: string, birthdate: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthdate,
      },
      width: '500px',
      backdropClass: 'backdropBackground'
    });
  }

  getFavouriteMovies(): void {
    this.fetchApiData.getUserProfile().subscribe((resp: any) => {
      this.favouriteMovies = resp.FavouriteMovies;
      console.log(this.favouriteMovies);
    });
  }

  addFavouriteMovie(MovieID: string, title: string): void {
    this.fetchApiData.addFavouriteMovie(MovieID).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your favourites!`, 'OK', {
        duration: 3000,
      });
      this.ngOnInit();
    });
    return this.getFavouriteMovies();
  }

  removeFavouriteMovie(MovieID: string, title: string): void {
    this.fetchApiData.deleteFavouriteMovie(MovieID).subscribe((resp: any) => {
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