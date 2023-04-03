import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from '../services/data.service';
import { datosUsuarioModel } from '../model/datosUsuarioModel';
import { ToastrService } from 'ngx-toastr';
import { Transaccion } from '../model/trancaccion';
import { ApiResponse } from '../model/apiResponse';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

addNewPostForm: FormGroup;
muser: datosUsuarioModel;
public roles;
farea: number = 2;
public lmessage=null;

  constructor(
    private router: Router,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {


    this.dataService.getlistAreas().subscribe(data => {
      this.dataService.lareas = data;
      this.roles = data;
    }


    );

    this.addNewPostForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      farea: new FormControl(3, ),
    });

  }

  ngOnInit() {


    //this.roles = this.dataService.lareas;
  }





  onSubmit() {

  //  console.log(this.addNewPostForm.value.email);
   // console.log(this.addNewPostForm.value.password);
    let apiResponse: ApiResponse;
    this.dataService.login(this.addNewPostForm.value.email, this.addNewPostForm.value.password,this.addNewPostForm.value.farea).subscribe((data:ApiResponse) => {



      if (data.status === 401 )
      {
    //    console.log("retorna");
        this.lmessage=data.message;
        return;
      }else if(data.status === 200 ){

        this.lmessage=null;

               this.muser = <datosUsuarioModel>data.result['user'];

        console.log("this.muser="+this.muser);
            this.dataService.guardarMuser(this.muser);
            this.dataService.guardarToken(data.result['token']);

            this.router.navigate( ['/mestructura'] );

      }

    }, (err) => {
      //console.log("error !!!!!" + JSON.stringify(err));
      this.router.navigate( ['/login'] );

     }
    );


/*


  //  localStorage.setItem('isLoggedIn', "true");

    console.log("----------------" + this.dataService.isLogged());
    //this.router.navigate(['/mestructura'], { state: { rol: this.user } });

    console.log("this.farea=" + this.farea);

    switch (parseInt(this.farea + ""))
        {
          case  2: this.muser = {usuCUsuario: 101, usuDUsuario: 'PLATAFORMA', areCArea: 2, areDNombre: 'PLATAFORMA', usuNUbigeo: '140113'};
          break;

          case  3: this.muser = {usuCUsuario: 102, usuDUsuario: 'MESA PARTES', areCArea: 3, areDNombre: 'MESA PARTES', usuNUbigeo: '190101'};
          break;

          case  4: this.muser = {usuCUsuario: 103, usuDUsuario: 'ENLACE', areCArea: 4, areDNombre: 'ENLACE', usuNUbigeo: '010101'};
          break;

          case  5: this.muser = {usuCUsuario: 104, usuDUsuario: 'BENEFICIADOS', areCArea: 5, areDNombre: 'BENEFICIADOS', usuNUbigeo: '030101'};
          break;

          case  6: this.muser = {usuCUsuario: 105, usuDUsuario: 'LEGAL', areCArea: 6, areDNombre: 'LEGAL', usuNUbigeo: '040101'};
          break;

          case  7: this.muser = {usuCUsuario: 106, usuDUsuario: 'EMPLEADORES', areCArea: 7, areDNombre: 'EMPLEADORES', usuNUbigeo: '050301'};
          break;

          case  8: this.muser = {usuCUsuario: 107, usuDUsuario: 'CONSTRUCCION', areCArea: 8, areDNombre: 'CONSTRUCCION', usuNUbigeo: '060101'};
          break;

          case  9: this.muser = {usuCUsuario: 108, usuDUsuario: 'MENSAJERIA', areCArea: 9, areDNombre: 'MENSAJERIA', usuNUbigeo: '070101'};
          break;

          case  1: this.muser = {usuCUsuario: 100, usuDUsuario: 'SYSADMIN', areCArea: 0, areDNombre: 'SYSADMIN', usuNUbigeo: '100101'};
          break;

        }

            this.router.navigate( ['/mestructura'] );
        this.dataService.guardarToken(this.muser);


*/


  }

}
