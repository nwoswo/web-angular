import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';
import { ElarchivosComponent } from '../../shared/elarchivos/elarchivos.component';
import { tsocArea } from 'src/app/model/tsocArea';
import { tsocSolicitud } from 'src/app/model/tsocSolicitud';
import { tsodReqinf } from 'src/app/model/tsodReqinf';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Transaccion } from 'src/app/model/trancaccion';
import { ShaconfirmComponent } from '../../shared/shaconfirm/shaconfirm.component';

@Component({
  selector: 'app-erinformacion',
  templateUrl: './erinformacion.component.html',
  styleUrls: ['./erinformacion.component.css']
})
export class ErinformacionComponent implements OnInit {

  msolicitud: tsocSolicitud;
  addNewPostForm: FormGroup;
  ltsodReqinf:tsodReqinf[]=[];
  data_select: tsodReqinf;
  vsubmit=false;
  data_edit:tsodReqinf;

  public itemsArea: tsocArea[];




  private notin = [2, 3, 4, 1,9];

  constructor(
    public toastr: ToastrService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private solicitudService: SolicitudService
  ) {




    this.msolicitud = <tsocSolicitud>this.router.getCurrentNavigation().extras.state.item;


    this.addNewPostForm = this.formBuilder.group({
      // area: new FormControl('',Validators.required),
       detalle:new FormControl('',Validators.required),
       orders: new FormArray([],this.minSelectedCheckboxes(1))
     });




  }

  ngOnInit() {

    this.getlistReqinf()
    this.loadListaAreas();
  }


  loadListaAreas()
  {






 this.dataService.getlistAreas().subscribe(data => {

      this.itemsArea = data.filter(data => !this.notin.includes(data.areCArea));
      this.addCheckboxes();

    });



  }






  //--------------------check boxses



  private setCheckboxes(iditem:number) {

    this.addNewPostForm.controls.orders=new FormArray([]);

    let myitemsArea=this.itemsArea.map(data=> data).filter(data1=> data1.areCArea==iditem);


    (this.addNewPostForm.controls.orders as FormArray).reset();
    myitemsArea.map((o, i) => {


      const control = new FormControl(true); // if first item set to true, else false

      (this.addNewPostForm.controls.orders as FormArray).push(control);


    });


    this.itemsArea=myitemsArea;
  }



  private addCheckboxes() {
    this.itemsArea.map((o, i) => {


      const control = new FormControl(false); // if first item set to true, else false
      (this.addNewPostForm.controls.orders as FormArray).push(control);
    });



  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }


  //FIN           /          -------------------check boxses


  getlistReqinf(){
    this.solicitudService.getlistReqinf(this.msolicitud.solCDocumento).subscribe(data=>{

      this.ltsodReqinf=data;
  })
  }

  open(content,mydata:tsodReqinf) {

    this.data_select=mydata;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }


  deleteReq(item:tsodReqinf)
  {


    if(item.rinEstado!=1){
      this.toastr.warning("El Requerimiento tiene respuesta no se puede borrar");
        return;
    }

    const modalRef = this.modalService.open(ShaconfirmComponent, { backdrop: true });
    modalRef.componentInstance.event.subscribe((result) => {
      if (result) {


        this.solicitudService.delReqInf(item.rinCRequerimiento).subscribe((trx:Transaccion)=>{

          if (trx.sCOD == '0000') {

            this.toastr.success("OPERACIÓN COMPLETADA ");
            this.ltsodReqinf = this.ltsodReqinf.filter(data => data.rinCRequerimiento !== item.rinCRequerimiento);
           // this.recargabandeja();
          }
          else {
            this.toastr.error("Error codigo :  " + trx.sDESCOD);
          }


        })

      }


      modalRef.close();


    });




  }


  editarReq(item:tsodReqinf)
  {



    if(item.rinEstado!=1){
      this.toastr.warning("El Requerimiento tiene respuesta no se puede editar");
        return;
    }


    this.addNewPostForm.reset();



    this.vsubmit=true;
    this.setCheckboxes(item.areCArea);
    this.addNewPostForm.controls["detalle"].setValue(item.rinDEtalle);
    this.addNewPostForm.controls.orders.disable();
    this.data_edit = item;



/*
    this.vsubmit=true;
    this.addNewPostForm.controls["area"].setValue(item.areCArea);
    this.addNewPostForm.controls["detalle"].setValue(item.rinDEtalle);
    this.addNewPostForm.controls["area"].disable();
    this.data_edit = item;

*/



  }

  onPostFormSubmit() {



/*

    this.addNewPostForm.reset();
    this.vsubmit=true;
    //this.addNewPostForm.controls["area"].setValue(5);
    this.setCheckboxes(5);
    this.addNewPostForm.controls["detalle"].setValue("TEST");
    this.addNewPostForm.controls.orders.disable();


return;
*/
    let item = new tsodReqinf();



    item.solCDocumento = this.msolicitud.solCDocumento;
    item.rinDEtalle = this.addNewPostForm.value.detalle;

    //item.areCArea = this.addNewPostForm.value.area;


    if(this.vsubmit)
    {

      item.rinCRequerimiento=this.data_edit.rinCRequerimiento;
      this.solicitudService.updatePregunta(item).subscribe((trx: Transaccion)=>{
        if (trx.sCOD === '0000')
        {
          this.toastr.success('REQUERIMIENTO MODIFICADO  ');
          this.getlistReqinf();
        }
        else{
          this.toastr.error('Error ='+trx.sDESCOD);
        }

      })

      this.data_edit=undefined;
      this.vsubmit=false;
      this.loadListaAreas();

    }else{


      const selectedOrderIds = this.addNewPostForm.value.orders.map((v, i) => v ? this.itemsArea[i].areCArea : null).filter(v => v !== null);

      item.areCAreas=selectedOrderIds.toString();


        this.solicitudService.registrarReqinf(item).subscribe((trx: Transaccion) => {
          if (trx.sCOD === '0000')
          {
            this.toastr.success('REQUERIMIENTO ENVIADO  ');
            this.getlistReqinf();
          }
          else{
            this.toastr.error('Error ='+trx.sDESCOD);
          }
        });
    }



    this.addNewPostForm.reset();

  }

    elistararchivo(item:tsodReqinf) {


      const modalRef = this.modalService.open(ElarchivosComponent, { backdrop: true, centered: true });
      modalRef.componentInstance.rinCRequerimiento = item.rinCRequerimiento;
      modalRef.componentInstance.arcCTipo = 0;

    }

}
