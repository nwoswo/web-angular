import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { NgForm } from '@angular/forms';

import { GsecUsuario } from 'src/app/model/gsecUsuario';

//services
import { UsuarioService } from '../../services/usuario.service';
import { DataService } from 'src/app/services/data.service';

import { Transaccion } from 'src/app/model/trancaccion';

//modal

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  providers: [UsuarioService]

})
export class NuevoUsuarioComponent {

  @Input() vsubmit: number;
  @Input() public usuario: GsecUsuario = new GsecUsuario();
  @Output() event: EventEmitter<any> = new EventEmitter();

  public transaccion: Transaccion;

  public genders = this.data.getDataGenders();
  msjResult: string;
  public roles =[]




  //Constructor
  constructor(
    public activeModal: NgbActiveModal, private service: UsuarioService,
    private data:DataService
    ) {

      this.data.getlistAreas().subscribe(data => {

        //console.log("data:"+JSON.stringify(data));

        this.roles = data;
      });

     }







  onSubmit(form: NgForm) {



    if (!form.valid) {
      return
    }

    if (this.vsubmit == 1)
      this.guardar(form)
    else
      this.actualizar()

    this.activeModal.close();

  }

  guardar(form: NgForm) {
    this.service.create(this.usuario)
      .subscribe(transacciono => {
        this.transaccion = transacciono;
        if (transacciono != null) {
          this.msjResult = transacciono.sCOD;
          this.event.emit(this.msjResult);
        }
      },
        error => {
          this.msjResult = <any>error;
          this.event.emit(this.msjResult);
        }
      );

  }


  actualizar() {


    this.service.updateDatos(this.usuario)
      .subscribe(transacciono => {
        this.transaccion = transacciono;
        if (transacciono != null) {
          this.msjResult = transacciono.sCOD;
          this.event.emit(this.msjResult);
        }
      },
        error => {
          this.msjResult = <any>error;
          this.event.emit(this.msjResult);
        }
      );








  }




  public  departamento: any[] =
    [

      { cod: 1, value: 'AMAZONAS' },
      { cod: 2, value: 'ANCASH' },
      { cod: 3, value: 'APURIMAC' },
      { cod: 4, value: 'AREQUIPA' },
      { cod: 5, value: 'AYACUCHO' },
      { cod: 6, value: 'CAJAMARCA' },
      { cod: 7, value: 'CUSCO' },
      { cod: 8, value: 'HUANCAVELICA' },
      { cod: 9, value: 'HUANUCO' },
      { cod: 10, value: 'ICA' },
      { cod: 11, value: 'JUNIN' },
      { cod: 12, value: 'LA LIBERTAD' },
      { cod: 13, value: 'LAMBAYEQUE' },
      { cod: 14, value: 'LIMA' },
      { cod: 15, value: 'LORETO' },
      { cod: 16, value: 'MADRE DE DIOS' },
      { cod: 17, value: 'MOQUEGUA' },
      { cod: 18, value: 'PASCO' },
      { cod: 19, value: 'PIURA' },
      { cod: 20, value: 'PUNO' },
      { cod: 21, value: 'SAN MARTIN' },
      { cod: 22, value: 'TACNA' },
      { cod: 23, value: 'TUMBES' },
      { cod: 25, value: 'UCAYALI' },
      { cod: 24, value: 'CALLAO' }

    ];

}
