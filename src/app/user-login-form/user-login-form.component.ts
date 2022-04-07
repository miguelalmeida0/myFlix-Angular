import { Component, OnInit, Input } from '@angular/core';

// import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';


import { Router } from '@angular/router';


// displays notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
 
    this.dialogRef.close(); // This will close the modal on success!
    console.log(result)
    localStorage.setItem('user', result.user.username);
      localStorage.setItem('token', result.token);
    this.snackBar.open('logged in successfully', 'OK', {
        duration: 2000
    });
    this.router.navigate(['movies']);
    }, (result) => {
      console.log(result)
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
