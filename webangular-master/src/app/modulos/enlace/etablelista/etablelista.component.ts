import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VdetallesolicitudComponent } from '../../shared/vdetallesolicitud/vdetallesolicitud.component';

import { Solicitud } from 'src/app/model/solicitud';
import { ElarchivosComponent } from '../../shared/elarchivos/elarchivos.component';
import { tsocSolicitud } from 'src/app/model/tsocSolicitud';
import { ToastrService } from 'ngx-toastr';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-etablelista',
  templateUrl: './etablelista.component.html',
  styleUrls: ['./etablelista.component.css']
})
export class EtablelistaComponent implements OnInit {

  @Input() items:any ={};
  @Output() myEmit: EventEmitter<tsocSolicitud>;
  private itemSolicitud= new tsocSolicitud();
  datossolicitud = [];



  private today = new Date();
  constructor(
    private modalService: NgbModal,
    public toastr: ToastrService,
    private solService: SolicitudService,
    private serviceData: DataService
    )
    {
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
    modalRef.componentInstance.solESolicitud = 100; //mandamos este estado para que pueda borrar todo
    modalRef.componentInstance.arcCTipo = 0;

    modalRef.componentInstance.passEntry.subscribe((result) => {
      if (result) {
          this.getSolicitudes('2,3,4,7');
          this.getSolicitudesPbandeja();
      }
     
      this.clearradio();
    })


    this.myEmit.emit(undefined);
  }



  clearradio()
{
  let or =document.getElementsByName('id_lista');
  for (var i = 0; i < or.length; i++) {
    or[i]['checked'] = false;
}
}







  getSolicitudes(estado: string) {
    this.solService.getSolicitudes(estado,'').subscribe(
      servicios => {
        this.items = servicios;
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


}

