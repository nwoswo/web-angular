import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

import {  ActivatedRoute, ParamMap } from '@angular/router';

import { Informacion } from 'src/app/model/informacion';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



import { ElarchivosComponent } from '../../shared/elarchivos/elarchivos.component';

import { datosUsuarioModel } from 'src/app/model/datosUsuarioModel';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { tsodReqinf } from 'src/app/model/tsodReqinf';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UploadComponent } from '../../shared/upload/upload.component';
import { ShaconfirmComponent } from '../../shared/shaconfirm/shaconfirm.component';



@Component({
  selector: 'app-abandeja',
  templateUrl: './abandeja.component.html',
  styleUrls: ['./abandeja.component.css']
})
export class AbandejaComponent implements OnInit {


  public muser:datosUsuarioModel;
  public items:tsodReqinf[]=[];
  public data_select:tsodReqinf;
  public contenido;
  addNewPostForm: FormGroup;
  public isCollapsed = true;
  public rinDEtalle="";

  constructor(
    private dataService:DataService,
    private modalService: NgbModal,
    private solicitudService:SolicitudService,
    public toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {

   this.listreq();

    this.addNewPostForm = this.formBuilder.group({
      respuesta:['', [Validators.required]]
    });
  }


  listreq()
  {
    this.muser=<datosUsuarioModel>this.dataService.getMuser();
    this.solicitudService.getlistReqinfBA(   this.muser.areCArea,1   ).subscribe(data=>{
      this.items=data;
      console.log(this.items);
    })
  }

colap()
{

  if (this.valida())return;

  this.rinDEtalle=this.data_select.rinDEtalle;
    this.addNewPostForm.controls.respuesta.setValue(this.data_select.rinDRespuesta);
    this.isCollapsed = !this.isCollapsed;
}
  ngOnInit() {
  }



  uploadAll(namefile:string)
  {
    if (this.valida())return;

    const modalRef = this.modalService.open(UploadComponent, { backdrop: true , size: 'lg',centered: true});
    console.log(this.data_select);
    modalRef.componentInstance.solCDocumento = this.data_select.solCDocumento;
    modalRef.componentInstance.rinCRequerimiento = this.data_select.rinCRequerimiento;
    modalRef.componentInstance.uptipo = 2;
    modalRef.componentInstance.arcCTipo = 3;
    modalRef.componentInstance.namefile = namefile;
    modalRef.componentInstance.event.subscribe((result) => {
      if (result) {
        this.data_select.nroArchivos=1;
      }
    });

  }

  atendido()
  {

   if(this.validaAtendido())
   return ;


    const modalRef = this.modalService.open(ShaconfirmComponent, { backdrop: true });
    modalRef.componentInstance.event.subscribe((result) => {
      
      if (result) {

      

    this.data_select.rinEstado=3;
    this.solicitudService.respuestaReqinf(this.data_select).subscribe(rpta=>{

      if (rpta.sCOD == '0000') {
        this.toastr.success("Operación Completada");

        this.items=this.items.filter(rpta=>
          rpta.rinCRequerimiento!==this.data_select.rinCRequerimiento
        );

      } else {
        this.toastr.error(rpta.sCOD + rpta.sDESCOD);
      }

    })

  }
  modalRef.close();

});
}


  regRespuesta()
  {

    this.data_select.rinDRespuesta=this.addNewPostForm.value.respuesta;

    this.data_select.rinEstado=2;
    this.solicitudService.respuestaReqinf(this.data_select).subscribe(rpta=>{

      if (rpta.sCOD == '0000') {
        this.toastr.success("Operación Completada");
      } else {
        this.toastr.error(rpta.sCOD + rpta.sDESCOD);
      }

    })
    this.isCollapsed = !this.isCollapsed;
    //this.modalService.dismissAll();
  }

  open(content,contenido:string) {

    this.contenido=contenido;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }


  inItemChange(item: tsodReqinf) {
    this.data_select = item;
    console.log(this.data_select);
  }


  elistararchivo(item:tsodReqinf) {

    const modalRef = this.modalService.open(ElarchivosComponent, { backdrop: true, centered: true , size: 'lg' });
    //modalRef.componentInstance.idSolicitud = item.solCDocumento;
    modalRef.componentInstance.rinCRequerimiento = item.rinCRequerimiento;
    modalRef.componentInstance.rinEstado = item.rinEstado;
    modalRef.componentInstance.arcCTipo = 3;

    modalRef.componentInstance.passEntry.subscribe((result) => {
      console.log("result -------------------------------- "+result);console.log(result);
      if(result)
      {
        this.data_select=undefined;
          this.listreq();

      }

      })

  }




valida()
{

  console.log("this.data_select="+this.data_select);


  if (typeof this.data_select === 'undefined' && !this.data_select)
    {
      this.toastr.info("Seleccione una solicitud ","",{positionClass:'toast-top-center'});return true;
    }



    if (this.data_select.rinEstado === 3 )
    {
      this.toastr.warning("El Requerimiento ya esta Atentido ","",{positionClass:'toast-top-center'});return true;
    }

}


  validaAtendido()
  {
    if (typeof this.data_select === 'undefined' && !this.data_select)
    {
      this.toastr.info("Seleccione una solicitud ","",{positionClass:'toast-top-center'});return true;
    }


    if (this.data_select.rinEstado === 1  )
    {
      this.toastr.warning("Debe ingresar una Respuesta para Marcar como Atendido el Requerimiento ","",{positionClass:'toast-top-center'});return true;
    }

    if (this.data_select.rinEstado === 3 )
    {
      this.toastr.warning("El Requerimiento ya esta Atentido ","",{positionClass:'toast-top-center'});return true;
    }

  }

}
