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
  favouriteMovies: any [] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
   ) {}

  ngOnInit(): void {
    this.getMovies();
    
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

  addFavouriteMovie(id: string): void {
    console.log(id);
    const token = localStorage.getItem('token');
    console.log(token)
    this.fetchApiData.addFavouriteMovie(id).subscribe((response: any) => {
      console.log(response);
      this.ngOnInit();
    });
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
 
  }
}
