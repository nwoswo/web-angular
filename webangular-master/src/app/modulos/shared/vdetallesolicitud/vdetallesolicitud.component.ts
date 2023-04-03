import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { tsocSolicitud } from 'src/app/model/tsocSolicitud';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-vdetallesolicitud',
  templateUrl: './vdetallesolicitud.component.html',
  styleUrls: ['./vdetallesolicitud.component.css']
})
export class VdetallesolicitudComponent implements OnInit {

  myForm: FormGroup;
  @Input() public item: tsocSolicitud = new tsocSolicitud();
  private mytsocSolicitudTemp:tsocSolicitud

  constructor(public activeModal: NgbActiveModal,private formBuilder: FormBuilder) {


    this.myForm = new FormGroup({
      perCTipodoc: new FormControl(),
      perNNrodoc: new FormControl(),
      perDRazonSocial: new FormControl(),
      perDApepat: new FormControl(),
      perDApemat: new FormControl(),
      perDNombre: new FormControl(),
      perDEmail: new FormControl(),
      codDpto: new FormControl(),
      codProv: new FormControl(),
      perNUbigeo: new FormControl(),
      perDUrbanizacion: new FormControl(),
      perDCalleave: new FormControl(),
      perDInterior: new FormControl(),
      perNCelular: new FormControl(),
      perNTelefono: new FormControl(),
      solDInformacion: new FormControl(),


      perCSolicitante: new FormControl(),
      perESolicitante: new FormControl(),
      trama: new FormControl(),
      solCDocumento: new FormControl(),
      solESolicitud: new FormControl(),
      solNHoja: new FormControl(),
      solFRegistro: new FormControl(),


      dedDDepart: new FormControl(),
      prdDProvi: new FormControl(),
      didDDistrito: new FormControl(),
      perDReferencia: new FormControl(),
      solERecojo: new FormControl()


    });




   // console.log("mytsocSolicitudTemp="+mytsocSolicitudTemp);





  }




  ngOnInit() {

    this.mytsocSolicitudTemp = {
      ...this.item
    };



    delete this.mytsocSolicitudTemp.nroArchivos;
    delete this.mytsocSolicitudTemp.nrodias;
    delete this.mytsocSolicitudTemp.nroreq;
    delete this.mytsocSolicitudTemp.nroreqresp;
    delete this.mytsocSolicitudTemp.usuCUsuario;
    delete this.mytsocSolicitudTemp.nroacusescan;
    delete this.mytsocSolicitudTemp.solCOrigen;
    delete this.mytsocSolicitudTemp.solCEcalificacion;
    delete this.mytsocSolicitudTemp.solFRespuesta;
    delete this.mytsocSolicitudTemp.solFEntrega;
    delete this.mytsocSolicitudTemp.nrooficio;


    this.myForm.setValue(this.mytsocSolicitudTemp);
    this.myForm.disable();
    this.myForm.get('solDInformacion').enable();

  }




}
