import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { VdetallesolicitudComponent } from '../../shared/vdetallesolicitud/vdetallesolicitud.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { tsocSolicitud } from 'src/app/model/tsocSolicitud';
import { ElarchivosComponent } from '../../shared/elarchivos/elarchivos.component';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-ptablelista',
  templateUrl: './ptablelista.component.html',
  styleUrls: ['./ptablelista.component.css']
})


export class PtablelistaComponent implements OnInit {

  @Input() items: any ={};
  @Output() myEmit: EventEmitter<tsocSolicitud>;

  myareCArea:number;
  idopcion:number;

  private itemSolicitud= new tsocSolicitud();


  constructor(
    private route:ActivatedRoute,
    private modalService: NgbModal,
    public toastr: ToastrService,
    public dataService :DataService,
    private solService: SolicitudService
    ) {



    this.route.queryParams.subscribe(params => {       this.idopcion=params.id;         })
    this.myareCArea= this.dataService.getareCArea();
    this.myEmit = new EventEmitter();
   }

  ngOnInit() {
  }

  inItemChange(item:tsocSolicitud){
    this.itemSolicitud=item;
    this.myEmit.emit(item);
   }

   vDetalleSolicitud(item:tsocSolicitud) {


    const modalRef = this.modalService.open(VdetallesolicitudComponent, { backdrop: true, size: 'lg' });
    modalRef.componentInstance.item = item;

  }

  elistararchivo(item:tsocSolicitud)
  {



    const modalRef = this.modalService.open(ElarchivosComponent, {  backdrop: 'static', centered: true , size: 'lg' ,keyboard: false  });
    modalRef.componentInstance.idSolicitud = item.solCDocumento;
    modalRef.componentInstance.solESolicitud = item.solESolicitud;
    modalRef.componentInstance.arcCTipo = 1;


    modalRef.componentInstance.passEntry.subscribe((result) => {
      
      if(result)
      {
      
        //item.nroArchivos=0;


        if(item.solESolicitud===6 || item.solESolicitud===6){
          this.getSolicitudes_consulta(this.dataService.getareCArea());
        }else{
          this.getSolicitudes_bandeja(this.dataService.getareCArea());
        }
      
      }
      
      this.inItemChange(undefined);
      this.clearradio();

   


      })

      /*
    modalRef.result.then((result) => {

      console.log("result -------------------------------- "+result);
      /*if (result) {
            console.log(result);
      }
    });
*/

}

clearradio()
{
  let or =document.getElementsByName('id_lista');
  for (var i = 0; i < or.length; i++) {
    or[i]['checked'] = false;
}
}



getSolicitudes_consulta(areCArea:number) {

  let myestados='6,7';

  this.solService.getSolicitudes(myestados,'').subscribe(
    servicios => {


      if(areCArea===3)
      {
        this.items = servicios.filter(data=> data.solCOrigen==1 );
      }else if(areCArea===2)
      {
        this.items = servicios.filter(data=> data.solCOrigen==10 );
      }




    }
  );
}



  getSolicitudes_bandeja(areCArea:number) {

    let estado:number;
    if(areCArea===3)
    {estado=1;}else
    {estado=10;  }


    this.solService.getSolicitudes(estado+"",'').subscribe(
      servicios => {
        this.items = servicios;
      },
      error => {
      }
    );
  }





}




