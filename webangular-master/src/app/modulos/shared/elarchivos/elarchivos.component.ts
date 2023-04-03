import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import { tsoDArchivos } from 'src/app/model/tsoDArchivos';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { AppConstants } from 'src/app/model/AppConstants';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-elarchivos',
  templateUrl: './elarchivos.component.html',
  styleUrls: ['./elarchivos.component.css']
})




export class ElarchivosComponent implements OnInit {

  public baseURL = AppConstants.baseURL;

   @Input() idSolicitud: number;
   @Input() rinCRequerimiento: number;
   @Input() arcCTipo: number;
   @Input() solESolicitud: number;
   @Input() rinEstado: number;

   @Output() passEntry: EventEmitter<any> = new EventEmitter();

    ltsoDArchivos:tsoDArchivos[];
  constructor(private solService: SolicitudService,  public activeModal: NgbActiveModal) {


   }



  ngOnInit() {
/*
    console.log("(this.idSolicitud="+this.idSolicitud);
    console.log("(this.rinCRequerimiento="+this.rinCRequerimiento);
    console.log("(this.arcCTipo="+this.arcCTipo);
    console.log("(this.solESolicitud="+this.solESolicitud);
    console.log("(this.rinEstado="+this.rinEstado);

*/


this.listar();



  }


  listar()
  {
    if(this.idSolicitud!=null){
      this.solService.getlistArchivos(this.idSolicitud,this.arcCTipo).subscribe(rpta=>{


        this.ltsoDArchivos=rpta;
        //console.log("this.ltsoDArchivos="+JSON.stringify(rpta));
        })
      }

      if(this.rinCRequerimiento!=null){
      this.solService.getlistArchivosReq(this.rinCRequerimiento,this.arcCTipo).subscribe(rpta=>{
        this.ltsoDArchivos=rpta;
       // console.log("this.ltsoDArchivos="+JSON.stringify(rpta));
        })
      }
  }

  delete(id:number)
  {


    this.solService.deleteArchivo(id).subscribe(rpta=>{
      this.passEntry.emit(true);

      this.listar();
    })


  }


  passBack() {


    this.passEntry.emit(false);
    this.activeModal.close();
    }


}
