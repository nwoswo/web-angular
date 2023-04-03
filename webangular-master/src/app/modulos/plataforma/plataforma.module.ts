import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlataformaRoutingModule } from './plataforma-routing.module';



//ng-module
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PconsultasolicitudComponent } from './pconsultasolicitud/pconsultasolicitud.component';
import { PbandejaComponent } from './pbandeja/pbandeja.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PtablelistaComponent } from './ptablelista/ptablelista.component';
import { PentregaAcuseComponent } from './pentrega-acuse/pentrega-acuse.component';

//servicios


import { SolicitudService } from 'src/app/services/solicitud.service';

//Modulos
import { SharedModule } from '../shared/shared/shared.module';
import { PmensajeriaComponent } from './pmensajeria/pmensajeria.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';



@NgModule({
  declarations: [PconsultasolicitudComponent, PbandejaComponent, PtablelistaComponent, PentregaAcuseComponent, PmensajeriaComponent],

  imports: [
    CommonModule,
    PlataformaRoutingModule,
    NgbModule, FormsModule, ReactiveFormsModule,SharedModule

  ],
  providers:[SolicitudService],
  entryComponents:[]
})
export class PlataformaModule { }
