import { Component, OnInit,ViewChildren,QueryList} from '@angular/core';

import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';

import { GsecUsuario } from 'src/app/model/gsecUsuario';

//servicios
import { UsuarioService } from './services/usuario.service';
import { UsuarioTableService } from './services/usuario.table.service';
import { SortableDirective, SortEvent } from './services/sortable.directive';



import { NuevoUsuarioComponent } from './modal/nuevo-usuario/nuevo-usuario.component';
import { ConfirmarComponent } from './modal/confirmar/confirmar.component';

//toaster
import { ToastrService } from 'ngx-toastr';

//ng
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Transaccion } from 'src/app/model/trancaccion';
import { UpdatePasswordComponent } from './modal/update-password/update-password.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [UsuarioService, ToastrService,UsuarioTableService, DecimalPipe]

})
export class UsuarioComponent implements OnInit {


  usuarhoshort$: Observable<GsecUsuario[]>;
  totaleshort$: Observable<number>;
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;


  public usuarios: GsecUsuario[] = [];
  public usuario: GsecUsuario;
  usuariotmp: GsecUsuario;
  errorMessage: string;
  public transaccion: Transaccion;



  constructor(
    private service: UsuarioService,
    public toastr: ToastrService,
    private modalService: NgbModal,
    public shortservice: UsuarioTableService
  )

  {

  }


  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.shortservice.sortColumn = column;
    this.shortservice.sortDirection = direction;
  }


  ngOnInit() {


    this.usuario = new GsecUsuario();
    this.usuariotmp = new GsecUsuario();
    this.getUsuarios()

    this.usuarhoshort$ = this.shortservice.usuarioshort$;
    this.totaleshort$ = this.shortservice.total$;

  }


  //----------------------Modal
  newUsuario() {
    const modalRef = this.modalService.open(NuevoUsuarioComponent, { backdrop: 'static', size: 'lg', keyboard: false });
    modalRef.componentInstance.vsubmit = 1;
    modalRef.componentInstance.event.subscribe((result) => {
      if (result == '0000') {
        this.toastr.success("Operacion Completada");
        this.getUsuarios();
      }
      else {
        this.toastr.error("Error codigo :  " + result);
      }
    });

  }


   confirmar(usuariou: GsecUsuario) {

    const modalRef = this.modalService.open(ConfirmarComponent, { backdrop: true });
    modalRef.componentInstance.event.subscribe((result) => {
      if (result) {
        this.service.update(usuariou).subscribe(
          transacciono => {
            this.transaccion = transacciono;
            if (transacciono.sCOD == '0000') {
              this.toastr.success("Operacion Completada");
              this.getUsuarios();
            }
          }, error => {
            this.toastr.error( this.transaccion.sCOD +  this.transaccion.sDESCOD);
          },

        );
      }
      modalRef.close();
    });
  }




  getUsuarios()

  {
    console.log(this.usuarhoshort$)
    this.service.getUsuarios().subscribe(
      usuarios => {
        this.shortservice.lusuarios = usuarios;
        this.shortservice._search$.next();
      },

    );

  }


  //Confirmar dar de Baja
  editar(usuariou: GsecUsuario) {



    const modalRef = this.modalService.open(NuevoUsuarioComponent, { backdrop: 'static', size: 'lg', keyboard: false });
    modalRef.componentInstance.usuario = usuariou;
    modalRef.componentInstance.vsubmit = 2;
    modalRef.componentInstance.event.subscribe((result) => {
      if (result == '0000') {
        this.toastr.success("Operacion Completada");
        this.getUsuarios();
      }
      else {
        this.toastr.error("Error codigo :  " + result);
      }
    });

  }



  updatePassword(usuariou: GsecUsuario) {



    const modalRef = this.modalService.open(UpdatePasswordComponent, { keyboard: false });
    modalRef.componentInstance.usuCUsuario = usuariou.usuCUsuario;


  }






}
