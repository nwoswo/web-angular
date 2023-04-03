import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EregistratransComponent } from '../modal/eregistratrans/eregistratrans.component';
import { Router, NavigationEnd } from '@angular/router';

import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

import { UploadComponent } from '../../shared/upload/upload.component';

import { SolicitudService } from 'src/app/services/solicitud.service';
import { tsocSolicitud } from 'src/app/model/tsocSolicitud';
import { PregistrarSolicitudComponent } from '../../plataforma/pregistrar-solicitud/pregistrar-solicitud.component';
import { Transaccion } from 'src/app/model/trancaccion';
import { ShaconfirmComponent } from '../../shared/shaconfirm/shaconfirm.component';





@Component({
  selector: 'app-ebandeja',
  templateUrl: './ebandeja.component.html',
  styleUrls: ['./ebandeja.component.css']
})
export class EbandejaComponent implements OnInit, OnDestroy {
  navigationSubscription;

  radioSelected: string;
  var: string;
  datossolicitud = [];
  private today = new Date();
  data_select: tsocSolicitud;

  //------

  ltsocSolicitud: tsocSolicitud[] = [];
  @ViewChild('etablelista') child;
  //----------


  ngOnInit() {



  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private serviceData: DataService,
    public toastr: ToastrService,
    private solService: SolicitudService,
    private dataService: DataService
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

    this.getSolicitudes('2,3,4,7');

      this.getSolicitudesPbandeja();
     // Set default values and re-fetch any data you need.

      }

      ngOnDestroy() {
      if (this.navigationSubscription) {
        this.navigationSubscription.unsubscribe();
      }
      }
      //inicio reload ----------



  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }


  getSolicitudes(estado: string) {

    this.solService.getSolicitudes(estado,'').subscribe(
      servicios => {
        this.ltsocSolicitud = servicios;
      },
      error => {
      }
    );
  }


  getSolicitudesPbandeja() {
    this.datossolicitud = this.serviceData.getLsolicitudes(5).map(data => {
    data.difdays = (Math.abs(data.fecha.getTime() - this.today.getTime()));
      data.difdays = Math.ceil(data.difdays / (1000 * 60 * 60 * 24))
      return data;
    }

    ).filter(data => data.estado == 2 || data.estado == 3 || data.estado == 4 || data.estado == 7 ? data : null);;
  }



  uploadAll(namefile:string) {
    if (typeof this.data_select === 'undefined' && !this.data_select) {
      this.toastr.info("Seleccione una solicitud ", "", { positionClass: 'toast-top-center' }); return;
    }

    const modalRef = this.modalService.open(UploadComponent, { backdrop: true, size: 'lg', centered: true });

    modalRef.componentInstance.solCDocumento = this.data_select.solCDocumento;
    modalRef.componentInstance.uptipo = 1;
    modalRef.componentInstance.arcCTipo = 2;
    modalRef.componentInstance.namefile = namefile;


    modalRef.componentInstance.event.subscribe((result) => {
      if (result) {
        this.getSolicitudes('2,3,4,7');

        this.getSolicitudesPbandeja();

        this.data_select=undefined;
        //this.data_select.nroArchivos = 1;
      }
    });
  }




  editar() {

    if (typeof this.data_select === 'undefined' && !this.data_select) {
      this.toastr.info("Seleccione una solicitud ", "", { positionClass: 'toast-top-center' }); return;
    }else if (this.data_select.solESolicitud === 4) {
      this.toastr.info(" La Solicitud cuenta con Documento de Acuse ya no puede ser modificado ", "", { positionClass: 'toast-top-center' });
      return true;
    }

    const modalRef = this.modalService.open(PregistrarSolicitudComponent, {  backdrop: 'static', size: 'lg',keyboard: false });
    modalRef.componentInstance.vsubmit = 2;
    modalRef.componentInstance.mytsocSolicitud = this.data_select;
    modalRef.componentInstance.event.subscribe(result => {
      if (result == '0000') {

        this.child.inItemChange(new tsocSolicitud());
        this.getSolicitudes('2,3,4,7');
        //this.data_select=null;

      }
      modalRef.close();
      this.data_select=undefined;

    });


  }



  requerirInformacion() {

    if(this.validaReqInf())
    return;


    this.router.navigate(['/mestructura/mestructura/menlace/erequerimiento'], { state: { item: this.data_select } });
  }




  generaAcuse() {

    if(this.validaGeneraAcuse())
    return;

    this.router.navigate(['/mestructura/mestructura/menlace/egacuse'], { state: { item: this.data_select } });
  }



  atenderSolcitud() {

    if(this.validaCalificaTrans())
    return;



      const modalRef = this.modalService.open(EregistratransComponent, { backdrop: true, size: <any>'xl', centered: true });
      modalRef.componentInstance.idSolicitud = this.data_select.solCDocumento;
      modalRef.componentInstance.event.subscribe((result) => {
        if (result === 1) {
          this.data_select.solESolicitud = 3;
          this.data_select.solCEcalificacion = 1;
          this.toastr.success("OPERACIÓN COMPLETADA -  la solicitud Califica como Transparencia ");
          setTimeout(() => { this.toastr.warning("Debe generar el Oficio y documento de Acuse "); }, 6000);
          this.recargabandeja();

        }
        else if (result === 2) {
          this.data_select.solESolicitud = 7;
          this.data_select.solCEcalificacion = 2;
          this.toastr.success("OPERACIÓN COMPLETADA -  la solicitud Califica NO  Transparencia ");
          setTimeout(() => { this.toastr.warning("ARCHIVE LA SOLICITUD - para limpiar su Bandeja "); }, 7000);
          this.recargabandeja();

        }
        modalRef.close();
      });


  }

  recargabandeja() {

    this.ltsocSolicitud = this.ltsocSolicitud.map(data => {
      if (data.solCDocumento === this.data_select.solCDocumento) {
        data = this.data_select;
      }
      return data;
    })

  }

  onItemChange(item: tsocSolicitud) {

    this.data_select = item;

  }

//----------------------------- Mensajeria  Estado 6
  mesaPartes(){ this.mover(6); }
//--Estado 5
  mensajeria(){ this.mover(5); }

  archivarSolicitud() {

    if (typeof this.data_select === 'undefined' && !this.data_select) {
      this.toastr.info("Seleccione una solicitud ", "", { positionClass: 'toast-top-center' });
      return true;
    } else  if (  this.data_select.solESolicitud != 4)  {
      this.toastr.warning("La solicitud debe tener una respuesta", "", { positionClass: 'toast-top-center' });
      return true;
    }else  if (  this.data_select.nrooficio === 0)  {
      this.toastr.warning("Debe Adjuntar el Oficio", "", { positionClass: 'toast-top-center' });
      return true;
    }





    console.log(this.data_select);
    const modalRef = this.modalService.open(ShaconfirmComponent, { backdrop: true });
    modalRef.componentInstance.event.subscribe((result) => {
      if (result) {
        if(this.data_select.solCOrigen===1)
        {

          if(this.data_select.solERecojo==='1')
          {
            this.toastr.success("Solicitud Derivada a Mesa de Partes ", "", { positionClass: 'toast-top-center' });
            this.mesaPartes();
          }else if(this.data_select.solERecojo==='0')
          {
            this.toastr.success("Solicitud Derivada a Mensajeria", "", { positionClass: 'toast-top-center' });
            this.mensajeria();

          }


        }else if(this.data_select.solCOrigen===10)
        {
          this.toastr.success("Solicitud Derivada a Mensajeria", "", { positionClass: 'toast-top-center' });
          this.mensajeria();
        }

      }
      modalRef.close();

    });

  }


mover(estado:number)
{

  this.solService.updateEstadoSol(this.data_select.solCDocumento,estado,this.dataService.getusuCUsuario()).subscribe((trx: Transaccion) => {

    if (trx.sCOD == '0000') {
      this.data_select.solESolicitud = 5;
      //this.toastr.success("OPERACIÓN COMPLETADA - la solicitud se envio a Archivo");
      this.ltsocSolicitud = this.ltsocSolicitud.filter(item => item !== this.data_select);
     // this.recargabandeja();
    }
    else {
      this.toastr.error("Error codigo :  " + trx.sDESCOD);
    }
  });

  this.modalService.dismissAll();

}

//-------------Validaciones



validaArchivaSol()
{
  if (typeof this.data_select === 'undefined' && !this.data_select) {
    this.toastr.info("Seleccione una solicitud ", "", { positionClass: 'toast-top-center' });
    return true;
  }else  if (this.data_select.solESolicitud === 3) {
    this.toastr.warning("La Solicitud esta pendiente de la Generacion de Acuse", "", { positionClass: 'toast-top-center' });
    return true;
  }
  else  if (this.data_select.solESolicitud === 2) {
    this.toastr.warning("La Solicitud debe tener una Calificación", "", { positionClass: 'toast-top-center' });
    return true;
  }
}


validaReqInf()
{
  if (typeof this.data_select === 'undefined' && !this.data_select) {
    this.toastr.info("Seleccione una solicitud ", "", { positionClass: 'toast-top-center' });
    return true;
  }/*else  if (this.data_select.solESolicitud === 3) {
    this.toastr.warning("La Solicitud ya tiene Calificacion", "", { positionClass: 'toast-top-center' });
    return true;
  }*/else  if (this.data_select.solESolicitud === 4) {
    this.toastr.warning("La Solicitud ya tiene Respuesta", "", { positionClass: 'toast-top-center' });
    return true;
  }
}


validaCalificaTrans()
{



  if (typeof this.data_select === 'undefined' && !this.data_select) {
    this.toastr.info("Seleccione una solicitud ", "", { positionClass: 'toast-top-center' });
    return true;
  }else  if (this.data_select.solESolicitud === 3) {
    this.toastr.warning("La Solicitud esta pendiente de la Generacion de Acuse", "", { positionClass: 'toast-top-center' });
    return true;
  }else  if (this.data_select.solESolicitud === 4) {
    this.toastr.warning("La Solicitud ya tiene Calificación", "", { positionClass: 'toast-top-center' });
    return true;
  }/*else  if (this.data_select.nroreq !== this.data_select.nroreqresp) {
    this.toastr.warning("Todas los Requerimientos de Informacion deben de estar Contestadas", "", { positionClass: 'toast-top-center' });
    return true;
  }*/


}


validaGeneraAcuse()
{
  if (typeof this.data_select === 'undefined' && !this.data_select) {
    this.toastr.info("Seleccione una solicitud ", "", { positionClass: 'toast-top-center' });
    return true;
  }else  if (this.data_select.solESolicitud === 2) {
    this.toastr.warning("La Solicitud esta pendiente de Calificación Transparencia", "", { positionClass: 'toast-top-center' });
    return true;
  }else  if (this.data_select.solESolicitud === 4) {
    this.toastr.warning("La Solicitud ya tiene Un Acuse Generado", "", { positionClass: 'toast-top-center' });
    return true;
  }else  if (this.data_select.nroreq !== this.data_select.nroreqresp) {
    this.toastr.warning("Todas los Requerimientos de Informacion deben de estar Contestadas", "", { positionClass: 'toast-top-center' });
    return true;
  }

}


}

