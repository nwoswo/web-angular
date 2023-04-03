import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Solicitud } from 'src/app/model/solicitud';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Archivo } from 'src/app/model/archivos';
import { tsocSolicitud } from 'src/app/model/tsocSolicitud';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Transaccion } from 'src/app/model/trancaccion';
import { AppConstants } from 'src/app/model/AppConstants';


interface datosAcuseModel {

  solCDocumento: number;
  perCSolicitante: number;

  pNombre: string;
  pDireccion: string;
  pUbigeo: string;
  pOficio: string;
  pHojaruta: string;
  pFecha: string;
  usuCUsuario:number;
  areCArea: number;
}




@Component({
  selector: 'app-egacuse',
  templateUrl: './egacuse.component.html',
  styleUrls: ['./egacuse.component.css']
})
export class EgacuseComponent implements OnInit {


  myForm: FormGroup;
  //datasolicitud :Solicitud;
  myitem:tsocSolicitud;
  datehoy:Date;
  archivo:Archivo;
  cargando = false;

  constructor(
    private router:Router,
    public toastr: ToastrService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private serviceSol: SolicitudService,
    private dataSolicitud: DataService
    ) {


    this.myForm = this.formBuilder.group({
      fOficio: new FormControl('',Validators.required)

    });

    this.datehoy=new Date();
    this.myitem=this.router.getCurrentNavigation().extras.state.item;


   }

  ngOnInit() {
  }


  generarAcuse()
  {
    this.cargando = true;

    let item:datosAcuseModel = <datosAcuseModel>new Object();

    item.solCDocumento=this.myitem.solCDocumento;
    item.perCSolicitante = this.myitem.perCSolicitante;
    item.pNombre= this.myitem.perDApepat +" "+ this.myitem.perDApemat +" "+ this.myitem.perDNombre;
    item.pDireccion = this.myitem.perDUrbanizacion +" "+ this.myitem.perDCalleave +" "+ this.myitem.perDInterior;
    item.pUbigeo = this.myitem.dedDDepart +" "+ this.myitem.prdDProvi + " " +this.myitem.didDDistrito;
    item.pOficio = this.myForm.controls.fOficio.value;
    item.pHojaruta = this.myitem.solNHoja;
    item.pFecha = this.datePipe.transform(this.datehoy, 'fullDate');
    item.usuCUsuario= this.dataSolicitud.getusuCUsuario();
    item.areCArea = this.dataSolicitud.getareCArea();

    

    this.myForm.reset();
    this.serviceSol.registrarAcuse(item).subscribe((rpta:Transaccion)=>
      {

        this.cargando = false;
        

        window.open(AppConstants.baseURL+`/sifonavic5/rest/archivos/downloadFile/${( <number>(rpta.result) )}`, "_blank");
        this.router.navigate( ['/mestructura/mestructura/menlace/ebandeja'] );


      })

  }



}
