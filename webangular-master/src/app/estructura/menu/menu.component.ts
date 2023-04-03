import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { datosUsuarioModel } from 'src/app/model/datosUsuarioModel';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [ToastrService]
})
export class MenuComponent implements OnInit {

  public menu :any[]=[];


  public muser:datosUsuarioModel;

  constructor(
    private router:Router,
    private dataService:DataService,
    public toastr: ToastrService
    ) {
    //console.log("menu="+this.router.getCurrentNavigation().extras.state.rol);
/*
    if(dataService.isLogged())
    console.log("logueado");
    else
    console.log("no logueado");

*/
    if(dataService.isLogged()){
      this.muser=<datosUsuarioModel>this.dataService.getMuser();




      switch (parseInt(this.muser.areCArea+""))
        {
          case  1: this.menu=  this.dataService.getDataUrlRoot();
          break;

          case  2: this.menu=  this.dataService.getDataUrlPlataforma();
          break;

          case  3:  this.menu= this.dataService.getDataUrlMesaPartes();
          break;

          case  4: this.menu=this.dataService.getDataUrlEnlace(); //this.toastr.warning("Usted tiene ( 2 SOLICITUDES  ) de transparencia pendientes por atender en Bandeja","Mensaje Importante",{ timeOut: 5000,positionClass:'toast-top-full-width'});
          break;

          case  5: this.menu=this.dataService.getDataUrlBeneficiarios(Number(this.muser.areCArea));
          break;

          case  9: this.menu=this.dataService.getDataUrlMensajeria();
          break;

          case  6: this.menu=this.dataService.getDataUrlLegal(Number(this.muser.areCArea));
          break;

          case  7: this.menu=this.dataService.getDataUrlEmpleadores(Number(this.muser.areCArea));
          break;

          case  8: this.menu=this.dataService.getDataUrlConstruccion(Number(this.muser.areCArea));
          break;



        }


        this.router.navigate(['/mestructura/mestructura/'+this.menu[0].value], { queryParams: { id: this.menu[0].id } });


  }else
  this.salir();
}

  ngOnInit() {
    if(!this.dataService.isLogged()){
      this.salir();
    }

  }


  navegar(menu:any){

  }

  salir()
  {
    this.dataService.logout();
    this.router.navigate(['/login']);

  }

// asignamos los urls para el Menu










}
