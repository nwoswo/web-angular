import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { tsocSolicitud } from 'src/app/model/tsocSolicitud';
import { ElarchivosComponent } from '../../shared/elarchivos/elarchivos.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VdetallesolicitudComponent } from '../../shared/vdetallesolicitud/vdetallesolicitud.component';

@Component({
  selector: 'app-econsultasolicitud',
  templateUrl: './econsultasolicitud.component.html',
  styleUrls: ['./econsultasolicitud.component.css']
})
export class EconsultasolicitudComponent  implements  OnDestroy {
  navigationSubscription;

  myareCArea:number;
  idopcion:number;
  myestados:string;
  vsolicitudes: tsocSolicitud[] = [];

  constructor(
    public dataService :DataService,
    private route:ActivatedRoute,
    private solService: SolicitudService,
    private modalService: NgbModal,
    private router: Router
    ) {

       //inicio reload ----------

          this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // If it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
              this.initialiseInvites();
            }
          });

        //inicio reload ----------

  }



  //inicio reload ----------

  initialiseInvites() {

    this.myareCArea= this.dataService.getareCArea();
    this.route.queryParams.subscribe(params => {       this.idopcion=params.id;         })
        switch (parseInt(this.idopcion+""))
        {
          case  10: this.myestados= '5,9';
          break;
          case  11: this.myestados=  '6,8';
          break;
          case  12: this.myestados= '7';
          break;
        }
      this.getSolicitudes(this.dataService.getareCArea());
     // Set default values and re-fetch any data you need.
      }

      ngOnDestroy() {
      if (this.navigationSubscription) {
        this.navigationSubscription.unsubscribe();
      }
      }
      //inicio reload ----------



  vDetalleSolicitud(item:tsocSolicitud) {


    const modalRef = this.modalService.open(VdetallesolicitudComponent, { backdrop: true, size: 'lg' });
    modalRef.componentInstance.item = item;

  }



  getSolicitudes(areCArea:number) {


    this.solService.getSolicitudes(this.myestados,'').subscribe(
      servicios => {



        this.vsolicitudes = servicios;





      }
    );



  }


  elistararchivo(item:tsocSolicitud)
  {


    const modalRef = this.modalService.open(ElarchivosComponent, { backdrop: true, centered: true , size: 'lg' });
    modalRef.componentInstance.idSolicitud = item.solCDocumento;
    modalRef.componentInstance.solESolicitud = 101; //mandamos este estado para que NO pueda borrar todo
    modalRef.componentInstance.arcCTipo = 0;
  }






}
