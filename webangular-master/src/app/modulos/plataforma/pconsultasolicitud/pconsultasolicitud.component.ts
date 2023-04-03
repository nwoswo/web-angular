import { Component, OnInit, OnDestroy } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { tsocSolicitud } from 'src/app/model/tsocSolicitud';
import { ElarchivosComponent } from '../../shared/elarchivos/elarchivos.component';
import { ToastrService } from 'ngx-toastr';
import { UploadComponent } from '../../shared/upload/upload.component';
import { ShaconfirmComponent } from '../../shared/shaconfirm/shaconfirm.component';
import { DataService } from 'src/app/services/data.service';
import { Transaccion } from 'src/app/model/trancaccion';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-pconsultasolicitud',
  templateUrl: './pconsultasolicitud.component.html',
  styleUrls: ['./pconsultasolicitud.component.css']
})
export class PconsultasolicitudComponent implements OnInit, OnDestroy {
  navigationSubscription;



  vsolicitudes: tsocSolicitud[] = [];
  data_select: tsocSolicitud;
  f: FormGroup;
  myareCArea:number;

  idopcion:number;
  myestados:string;


  constructor(
    private route:ActivatedRoute,
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

      this.myareCArea= this.dataService.getareCArea();
      this.route.queryParams.subscribe(params => {       this.idopcion=params.id;         })
        switch (parseInt(this.idopcion+""))
        {
          case  10: this.myestados= '2,3,4,5';
          break;
          case  11: this.myestados=  '6,7';
          break;
          case  12: this.myestados= '8';
          break;
          case  13: this.myestados= '2,3,4,5,6,7,8,9';
          break;
        }

        this.getSolicitudes(this.dataService.getareCArea());
        this.f = this.formBuilder.group({
          textbuscar:new FormControl('',[Validators.required,Validators.minLength(8)])
        });
       // Set default values and re-fetch any data you need.

  }

  ngOnDestroy() {
  if (this.navigationSubscription) {
    this.navigationSubscription.unsubscribe();
  }
  }
//inicio reload ----------





  getSolicitudes(areCArea:number) {

    console.log("areCArea="+areCArea);
    this.solService.getSolicitudes(this.myestados,'').subscribe(
      servicios => {


        if(areCArea===3)
        {
          this.vsolicitudes = servicios.filter(data=> data.solCOrigen==1 );
        }else if(areCArea===2)
        {
          this.vsolicitudes = servicios.filter(data=> data.solCOrigen==10 );
        }




      }
    );
  }

  buscar()
  {

    this.solService.getSolicitudes('',this.f.value.textbuscar).subscribe(
      servicios => {

        this.vsolicitudes = servicios;

      }
    );


  }

  onItemChange(item: tsocSolicitud) {
    this.data_select = item;
  }


  uploadAucuseScan(namefile:string) {
    if (typeof this.data_select === 'undefined' && !this.data_select) {
      this.toastr.info("Seleccione una solicitud ", "", { positionClass: 'toast-top-center' }); return;
    }else if(this.data_select.solESolicitud !=6)
    {
      this.toastr.warning("La Solicitud no tiene Acuse ", "", { positionClass: 'toast-top-center' });
      return true;

    }

    const modalRef = this.modalService.open(UploadComponent, { backdrop: true, size: 'lg', centered: true });

    modalRef.componentInstance.solCDocumento = this.data_select.solCDocumento;
    modalRef.componentInstance.uptipo = 1;
    modalRef.componentInstance.arcCTipo = 5;
    modalRef.componentInstance.namefile = namefile;

    modalRef.componentInstance.event.subscribe((result) => {
      this.getSolicitudes(this.dataService.getareCArea());
      this.data_select=undefined;
    });




  }


  derivar() {

    if(this.validaatendido())
    return;


    const modalRef = this.modalService.open(ShaconfirmComponent, { backdrop: true });
    modalRef.componentInstance.event.subscribe((result) => {
      if (result) {
        this.solService.updateEstadoSol(this.data_select.solCDocumento,8,this.dataService.getusuCUsuario()).subscribe((result2: Transaccion) => {

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

  }


  validaatendido()
  {

    if (typeof this.data_select === 'undefined' && !this.data_select)
    {
      this.toastr.info("Seleccione una solicitud ", "", { positionClass: 'toast-top-center' });
      return true;
    }else if(this.data_select.solESolicitud !=6)
    {
      this.toastr.warning("La Solicitud no se puede Marcar como Atendido", "", { positionClass: 'toast-top-center' });
      return true;

    }else if (this.data_select.nroacusescan==0 )
    {
      this.toastr.warning("Adjunte el Acuse Escaneado a la Solicitud", "", { positionClass: 'toast-top-center' });
      return true;
    }



  }




  ngOnInit() {
  }



}
