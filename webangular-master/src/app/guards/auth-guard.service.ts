import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { DataService } from '../services/data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
 
  constructor(private dataService:DataService,
              private router:Router) {

  }

  canActivate():boolean{
    console.log("Guard");
    if(this.dataService.isLogged())return true;else this.router.navigateByUrl('/login')

  }

}
