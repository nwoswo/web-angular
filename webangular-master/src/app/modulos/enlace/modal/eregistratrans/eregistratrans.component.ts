import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Transaccion } from 'src/app/model/trancaccion';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-eregistratrans',
  templateUrl: './eregistratrans.component.html',
  styleUrls: ['./eregistratrans.component.css']
})
export class EregistratransComponent implements OnInit {

  @Output() event: EventEmitter<any> = new EventEmitter();
  @Input() idSolicitud: number;

  constructor(
    public activeModal: NgbActiveModal,
    private solService: SolicitudService,
    private toastr: ToastrService,
    private dataService: DataService
    ) { }

  ngOnInit() {
  }


  confirm(): void {



    this.solService.updateEstadoSol(this.idSolicitud,3,this.dataService.getusuCUsuario()).subscribe((trx: Transaccion) => {

      if (trx.sCOD == '0000') {
      //  this.toastr.success("Operacion Completada");
        this.event.emit(1);
      }
      else {
        this.toastr.error("Error codigo :  " + trx.sDESCOD);
        this.event.emit(3);
      }
    //  this.event.emit(3);
    });


  }

  decline(): void {


    this.solService.updateEstadoSol(this.idSolicitud,7,this.dataService.getusuCUsuario()).subscribe((trx: Transaccion) => {

      if (trx.sCOD == '0000') {
       // this.toastr.success("Operacion Completada");
        this.event.emit(2);
      }
      else {
        this.toastr.error("Error codigo :  " + trx.sDESCOD);
        this.event.emit(3);
      }
     // this.event.emit(3);
    });





  }



}
