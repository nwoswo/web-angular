import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from '../usuario/usuario.component';
import { NuevoUsuarioComponent } from './modal/nuevo-usuario/nuevo-usuario.component';


//servicios
import { UsuarioService } from './services/usuario.service';
import { ConfirmarComponent } from './modal/confirmar/confirmar.component'; // <-- import the module


//ng-module
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdatePasswordComponent } from './modal/update-password/update-password.component';
import { SortableDirective } from './services/sortable.directive';


//





@NgModule({
  declarations: [UsuarioComponent, NuevoUsuarioComponent, ConfirmarComponent, UpdatePasswordComponent,SortableDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuarioRoutingModule,
    NgbModule
  ],
  providers: [UsuarioService],
  entryComponents:[NuevoUsuarioComponent,ConfirmarComponent,UpdatePasswordComponent]
})
export class UsuarioModule { }
