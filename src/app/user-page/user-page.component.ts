/** 
 * The UserPageComponent is used to render a mat card displaying the user's profile details in a form.
 * Users can edit this form to edit their user details and save them by clicking on the "Edit Profile" button.  
 * The user can also deregister from the application by clicking the "Delete Profile" button
 * @module UserPageComponent
 */

import { Component, OnInit, Input } from '@angular/core';
// Used to access the getUserProfile function created on this service
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// Used to navigate the user back to the welcome page on successful deregistration
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  userString: any = localStorage.getItem('user');
  user: any = JSON.parse(this.userString);

  @Input() userData = { 
    FirstName: this.user.FirstName,
    LastName: this.user.LastName,
    Username: this.user.Username, 
    Email: this.user.Email, 
    Password: '', 
    Birthdate: this.user.Birthdate
  };

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Calls the getUserProfile method as soon as the component loads so that the data can be used to populate the template.
   */  
  ngOnInit(): void {
    this.getUserProfile();
    console.log(this.userData);
  }


  /** 
   * Invokes the getUserProfile method on the fetchApiData service and populates the user object with the response. 
   * @function getUserProfile
   * @returns an object with the user details
   */ 
  getUserProfile(): void {
    const UserID = localStorage.getItem('UserID');
    if (UserID) {
      this.fetchApiData.getUserProfile().subscribe((res: any) => {
        this.user = res;
        console.log(this.user);
        return this.user;
      });
    }
  }
   
  /**
   * Takes userData from the form and invokes editUserProfile method on the fetchApiData service to update user object.
   * Updates user object saves in localStorage.
   * @function editUser
   * @returns an object with the updated user details
   */ 
  editUser(): void {
    console.log(this.userData);
    this.fetchApiData.editUserProfile(this.userData).subscribe((resp) => {
      localStorage.setItem('user', JSON.stringify(resp));// update profile in localstorage
      this.snackBar.open('Your profile was updated successfully!', 'OK', {
        duration: 4000,
      });
      setTimeout(() => {
        window.location.reload();
      });
    });
  }

  
/**
 * Asks user if they are sure about deleting their profile. If response is yes, invokes the deleteUserProfile 
 * method on the fetchApiData service to deregister the user. If deregistration is successful the local storage 
 * is cleared, a popup confirms that the profile has been removed and the user is routed back to the welcome page.
 * @function deleteUser
 * @return an empty user object
 */
  deleteUser(): void {
    if (confirm('Are you sure? This cannot be undone.')) {
      this.fetchApiData.deleteUserProfile().subscribe(() => {
        this.snackBar.open(`${this.user.Username} has been removed!`, 'OK', {
          duration: 4000,
        });
        localStorage.clear();
      });
      this.router.navigate(['welcome']);
    }
  }

 
}
 