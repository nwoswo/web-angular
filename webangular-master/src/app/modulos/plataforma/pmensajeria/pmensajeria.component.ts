import { Component, OnInit, OnDestroy } from '@angular/core';
import { tsocSolicitud } from 'src/app/model/tsocSolicitud';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { UploadComponent } from '../../shared/upload/upload.component';
import { ShaconfirmComponent } from '../../shared/shaconfirm/shaconfirm.component';
import { ElarchivosComponent } from '../../shared/elarchivos/elarchivos.component';
import { Transaccion } from 'src/app/model/trancaccion';
import { VdetallesolicitudComponent } from '../../shared/vdetallesolicitud/vdetallesolicitud.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-pmensajeria',
  templateUrl: './pmensajeria.component.html',
  styleUrls: ['./pmensajeria.component.css']
})
export class PmensajeriaComponent implements  OnDestroy {
  navigationSubscription;

  vsolicitudes: tsocSolicitud[] = [];
  data_select: tsocSolicitud;
  f: FormGroup;
  myareCArea:number;



  constructor(
    private solService: SolicitudService,
    private modalService: NgbModal,
    public toastr: ToastrService,
    public dataService :DataService,
    private formBuilder: FormBuilder,
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

        this.getSolicitudes();
        this.f = this.formBuilder.group({
          textbuscar:new FormControl('',[Validators.required,Validators.minLength(8)])
        });
        this.myareCArea= this.dataService.getareCArea();
     // Set default values and re-fetch any data you need.
      }


      ngOnDestroy() {
      if (this.navigationSubscription) {
        this.navigationSubscription.unsubscribe();
      }
      }
      //inicio reload ----------





  getSolicitudes() {


    this.solService.getSolicitudes('5','').subscribe(
      servicios => {

        this.vsolicitudes = servicios;
        console.log(this.vsolicitudes);
      }
    );
  }

  buscar()
  {
    console.log(this.f.value.textbuscar);
    this.solService.getSolicitudes('5,9',this.f.value.textbuscar).subscribe(
      servicios => {

        this.vsolicitudes = servicios;

      }
    );


  }

  vDetalleSolicitud(item:tsocSolicitud) {


    const modalRef = this.modalService.open(VdetallesolicitudComponent, { backdrop: true, size: 'lg' });
    modalRef.componentInstance.item = item;

  }





  inItemChange(item: tsocSolicitud) {
    this.data_select = item;
  }


  uploadAll(namefile:string) {
    if (typeof this.data_select === 'undefined' && !this.data_select) {
      this.toastr.info("Seleccione una solicitud ", "", { positionClass: 'toast-top-center' }); return;
    }else if(this.data_select.solESolicitud !=5)
    {
      this.toastr.warning("La Solicitud no tiene Acuse ", "", { positionClass: 'toast-top-center' });
      return true;

    }

    const modalRef = this.modalService.open(UploadComponent, { backdrop: true, size: 'lg', centered: true });
    console.log(this.data_select);
    modalRef.componentInstance.solCDocumento = this.data_select.solCDocumento;
    modalRef.componentInstance.uptipo = 1;
    modalRef.componentInstance.arcCTipo = 5;
    modalRef.componentInstance.namefile = namefile;

    modalRef.componentInstance.event.subscribe((result) => {
      this.getSolicitudes();
    });
  }


  derivar() {

    if(this.validaatendido())
    return;


    const modalRef = this.modalService.open(ShaconfirmComponent, { backdrop: true });
    modalRef.componentInstance.event.subscribe((result) => {
      if (result) {
        this.solService.updateEstadoSol(this.data_select.solCDocumento,9,this.dataService.getusuCUsuario()).subscribe((result2: Transaccion) => {

          if (result2.sCOD == '0000') {
            this.solService.updateFEntrega(this.data_select.solCDocumento).subscribe();
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


  elistararchivo()
  {

    if (typeof this.data_select === 'undefined' && !this.data_select)
    {
      this.toastr.info("Seleccione una solicitud ","",{positionClass:'toast-top-center'});return;
    }

    const modalRef = this.modalService.open(ElarchivosComponent, { backdrop: true, centered: true });
    modalRef.componentInstance.idSolicitud = this.data_select.solCDocumento;
    modalRef.componentInstance.arcCTipo = 1;


    modalRef.componentInstance.passEntry.subscribe((result) => {

      if(result)
      {

        this.getSolicitudes();

      }
      this.inItemChange(undefined);
      this.clearradio();
      })


  }


  clearradio()
{
  let or =document.getElementsByName('id_lista');
  for (var i = 0; i < or.length; i++) {
    or[i]['checked'] = false;
}
}


  validaatendido()
  {




    if (typeof this.data_select === 'undefined' && !this.data_select)
    {
      this.toastr.info("Seleccione una solicitud ", "", { positionClass: 'toast-top-center' });
      return true;
    }else if(this.data_select.solESolicitud !=5)
    {
      this.toastr.warning("La Solicitud no se puede Marcar como Atendido", "", { positionClass: 'toast-top-center' });
      return true;

    }else if (this.data_select.nroacusescan==0 )
    {
      this.toastr.warning("Adjunte el Acuse Escaneado a la Solicitud", "", { positionClass: 'toast-top-center' });
      return true;
    }



  }





}
