import { Injectable, NgZone } from '@angular/core';
//animacion
import { ToastrService } from 'ngx-toastr';


//import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastr: ToastrService,
    //public snackBar: MatSnackBar,
    private zone: NgZone) { }

  showSuccess(message: string): void {
    // Had an issue with the snackbar being ran outside of angular's zone.

    
    this.zone.run(() => {
      setTimeout(() => {
      this.toastr.success(message);
      
    }, 0);
    });
  } 

  showError(message: string): void {
    this.zone.run(() => {
      setTimeout(() => {
      // The second parameter is the text in the button. 
      // In the third, we send in the css class for the snack bar.
      //this.snackBar.open(message, 'X', {panelClass: ['error']});
      this.toastr.error(message)
      
    }, 1000);
    });
  }
}