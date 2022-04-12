import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';



@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  user: any = {};
  username: any = localStorage.getItem('user');
  movies: any[] = [];
  genres: any[] = [];
  FavMovie: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
   ) {}

  ngOnInit(): void {
    this.getMovies();
    this.showFavMovie();
    
  }

getMovies(): void {
  this.fetchApiData.getMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getCurrentUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
       
     console.log(resp)
      const currentUser=resp.username
      console.log(currentUser)
      const currentFavs=resp.FavouriteMovies
      console.log(currentFavs)

    });
  }

  showFavMovie(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.FavMovie = resp.FavoriteMovies;
      return this.FavMovie;
    });
  }

  addFavouriteMovie(movieId: string, Title: string): void {
    this.fetchApiData.addFavouriteMovie(this.user.username, movieId).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`${Title} has been added to your favorites.`, 'OK', {
      duration: 3000,
    });
    this.showFavMovie();
    });
  }

  setAsFavourite(movie: any): void {
    this.isFavourite(movie._id)
      ? this.deleteFavouriteMovie(movie._id, movie.Title)
      : this.addFavouriteMovie(movie._id, movie.Title);
  }

  isFavourite(movieId: string): boolean {
    console.log(movieId);
    console.log('FavouriteMovie list', this.FavMovie);
    return this.FavMovie.some((id) => id === movieId);
  }

  deleteFavouriteMovie(movieId: string, Title: string): void {
    this.fetchApiData.deleteFavouriteMovie(this.user.username, movieId).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`${Title} is no longer a favourite of yours!.`, 'OK', {
        duration: 3000,
      });
      this.showFavMovie();
    });
  }

  openSynopsis(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px'
    });
   
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorViewComponent , {
      panelClass: 'custom-dialog-container',
      data: {Name: name, Bio: bio },
      width: '500px',
    });
  }
  }

