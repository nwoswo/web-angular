import { Component, OnInit, ViewChild,OnDestroy } from '@angular/core';

//servicios
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//componentes

import { PregistrarSolicitudComponent } from '../pregistrar-solicitud/pregistrar-solicitud.component';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { tsocSolicitud } from 'src/app/model/tsocSolicitud';
import { ToastrService } from 'ngx-toastr';
import { ShaconfirmComponent } from '../../shared/shaconfirm/shaconfirm.component';
import { Transaccion } from 'src/app/model/trancaccion';
import { UploadComponent } from '../../shared/upload/upload.component';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute,Router, NavigationEnd } from '@angular/router';





@Component({
  selector: 'app-pbandeja',
  templateUrl: './pbandeja.component.html',
  styleUrls: ['./pbandeja.component.css']
})
export class PbandejaComponent implements OnInit, OnDestroy {
 navigationSubscription;

  radioSelected: string;
  var: string;
  //datossolicitud:Solicitud[];
  vsolicitudes: tsocSolicitud[] = [];
  data_select: tsocSolicitud;
  private i: number;
  idopcion:number;

  @ViewChild('ptablelista') child;

  ngOnInit() {
  }


  constructor(
    private modalService: NgbModal,
    private solService: SolicitudService,
    public toastr: ToastrService,
    public dataService :DataService,
    private route:ActivatedRoute,
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

              this.route.queryParams.subscribe(params => {       this.idopcion=params.id;         })
              this.getSolicitudes(this.dataService.getareCArea());
               // Set default values and re-fetch any data you need.

          }

          ngOnDestroy() {
          if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
          }
          }
        //inicio reload ----------




  getSolicitudes(areCArea:number) {

    console.log("object");

    let estado:number;
    if(areCArea===3)
    {estado=1;}else
    {estado=10;  }


    this.solService.getSolicitudes(estado+"",'').subscribe(
      servicios => {
        this.vsolicitudes = servicios;
      },
      error => {
      }
    );
  }



  newUsuario() {
    const modalRef = this.modalService.open(PregistrarSolicitudComponent, { backdrop: 'static', size: 'lg'  });
    modalRef.componentInstance.vsubmit = 1;
    modalRef.componentInstance.event.subscribe(result => {

      if (result == '0000') {
        this.getSolicitudes(this.dataService.getareCArea());
      }

      modalRef.close();
    });
  }



  uploadAll(namefile:string)
  {
    if (typeof this.data_select === 'undefined' && !this.data_select)
    {
      this.toastr.info("Seleccione una solicitud ","",{positionClass:'toast-top-center'});return;
    }

    const modalRef = this.modalService.open(UploadComponent, { backdrop: 'static' , size: 'lg',centered: true,keyboard: false});

    modalRef.componentInstance.solCDocumento = this.data_select.solCDocumento;
    modalRef.componentInstance.uptipo = 1;
    modalRef.componentInstance.arcCTipo = 1;
    modalRef.componentInstance.namefile = namefile;

    modalRef.componentInstance.event.subscribe((result) => {
      if (result) {
        this.data_select.nroArchivos=1;
        //this.data_select =undefined;
        //this.child('clearradio()');
      }
    });

  }


  borrar() {
    if (typeof this.data_select === 'undefined' && !this.data_select)
    {
      this.toastr.info("Seleccione una solicitud ","",{positionClass:'toast-top-center'});return;
    }

    const modalRef = this.modalService.open(ShaconfirmComponent, { backdrop: true });
    modalRef.componentInstance.event.subscribe((result) => {

      if (result) {


        this.solService.updateEstadoSol(this.data_select.solCDocumento,0,this.dataService.getusuCUsuario()).subscribe((result2: Transaccion) => {

          if (result2.sCOD == '0000') {
            this.toastr.success("Operación Completada");
            this.vsolicitudes = this.vsolicitudes.filter(item => item !== this.data_select);
          }
          else {
            this.toastr.error("Error codigo :  " + result2);
          }
        });

      }
      modalRef.close();

    });

  }


  derivar() {
    if (typeof this.data_select === 'undefined' && !this.data_select)
    {
      this.toastr.info("Seleccione una solicitud ","",{positionClass:'toast-top-center'});return;
    }

    if (this.data_select.nroArchivos==0)
    {
      this.toastr.warning("Escanee y Adjunte la solicitud para poder Derivar ","",{positionClass:'toast-top-right'});return;
    }

    const modalRef = this.modalService.open(ShaconfirmComponent, { backdrop: true });
    modalRef.componentInstance.event.subscribe((result) => {
      if (result) {

        this.solService.updateEstadoSol(this.data_select.solCDocumento,2,this.dataService.getusuCUsuario()).subscribe((result2: Transaccion) => {



          if (result2.sCOD == '0000') {
            this.toastr.success("Operación Completada");
            this.vsolicitudes = this.vsolicitudes.filter(item => item.solCDocumento !== this.data_select.solCDocumento);

          }
          else {
            this.toastr.error("Error codigo :  " + result2);

          }
          this.data_select=undefined;
        });

      }


      modalRef.close();


    });

  }




  editar(){


    if (typeof this.data_select === 'undefined' && !this.data_select)
    {
      this.toastr.info("Seleccione una solicitud ","",{positionClass:'toast-top-center'});return;
    }

    const modalRef = this.modalService.open(PregistrarSolicitudComponent, { backdrop: 'static', size: 'lg', keyboard: false});
    modalRef.componentInstance.vsubmit = 2;
    modalRef.componentInstance.mytsocSolicitud=this.data_select ;
    modalRef.componentInstance.event.subscribe(result => {
      if (result == '0000') {
        this.child.inItemChange(new tsocSolicitud());
      this.getSolicitudes(this.dataService.getareCArea());
      }
      modalRef.close();
      this.data_select=undefined;
    });


  }

  onItemChange(item: tsocSolicitud) {



    this.data_select = item;
  }


}


