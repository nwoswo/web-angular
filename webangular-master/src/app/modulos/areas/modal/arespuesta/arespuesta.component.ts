import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Informacion } from 'src/app/model/informacion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { tsodReqinf } from 'src/app/model/tsodReqinf';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-arespuesta',
  templateUrl: './arespuesta.component.html',
  styleUrls: ['./arespuesta.component.css']
})
export class ArespuestaComponent implements OnInit {

  private iinformacion:tsodReqinf;
  addNewPostForm: FormGroup;
  submitted = false;
  @Output() event: EventEmitter<any> = new EventEmitter();



  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private solicitudService:SolicitudService,
    public toastr: ToastrService
    ) {

    this.addNewPostForm = this.formBuilder.group({
      respuesta:['', [Validators.required, Validators.minLength(30)]]
    });

  }

  ngOnInit() {
    console.log(this.iinformacion);
  }

  onPostFormSubmit()
  {

    this.submitted = true;
    if (this.addNewPostForm.invalid) {return; }

      this.iinformacion.rinDRespuesta= this.addNewPostForm.value.respuesta;


      console.log("this.addNewPostForm.value.respuesta="+this.iinformacion);

      this.solicitudService.respuestaReqinf(this.iinformacion).subscribe(rpta=>{

        if (rpta.sCOD == '0000') {

          this.event.emit(true);
          this.toastr.success("Operación Completada");
        } else {
          this.event.emit('0001');
          this.toastr.error(rpta.sCOD + rpta.sDESCOD);
        }

      })


  }

}
