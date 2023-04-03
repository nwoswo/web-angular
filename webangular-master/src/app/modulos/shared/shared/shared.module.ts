import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShaconfirmComponent } from '../shaconfirm/shaconfirm.component';
import { UploadComponent } from '../upload/upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { FileSelectDirective } from 'ng2-file-upload';
import { ElarchivosComponent } from '../elarchivos/elarchivos.component';
import { PregistrarSolicitudComponent } from '../../plataforma/pregistrar-solicitud/pregistrar-solicitud.component';
import { VdetallesolicitudComponent } from '../vdetallesolicitud/vdetallesolicitud.component';
import { FileUploadModule } from 'ng2-file-upload';
//import { UploadComponent } from './modulos/shared/upload/upload.component';


@NgModule({
  declarations: [ShaconfirmComponent,UploadComponent,
    //FileSelectDirective,
    ElarchivosComponent,PregistrarSolicitudComponent,VdetallesolicitudComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,FileUploadModule
  ],
  providers:[],
  exports:[ShaconfirmComponent,UploadComponent
  ],
  entryComponents:[ShaconfirmComponent,
    UploadComponent,
    ElarchivosComponent,PregistrarSolicitudComponent,VdetallesolicitudComponent]
})
export class SharedModule { }
