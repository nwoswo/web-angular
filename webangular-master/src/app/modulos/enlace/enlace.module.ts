import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { EnlaceRoutingModule } from './enlace-routing.module';
import { EbandejaComponent } from './ebandeja/ebandeja.component';
import { EtablelistaComponent } from './etablelista/etablelista.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EregistratransComponent } from './modal/eregistratrans/eregistratrans.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EgacuseComponent } from './egacuse/egacuse.component';
import { ErinformacionComponent } from './erinformacion/erinformacion.component';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { SharedModule } from '../shared/shared/shared.module';
import { EconsultasolicitudComponent } from './econsultasolicitud/econsultasolicitud.component';








@NgModule({
  declarations: [  EbandejaComponent, EregistratransComponent,EtablelistaComponent, EgacuseComponent, ErinformacionComponent, EconsultasolicitudComponent ],
  imports: [
    CommonModule,
    EnlaceRoutingModule,NgbModule,FormsModule,ReactiveFormsModule,SharedModule
  ],
  providers:[SolicitudService,DatePipe],
  entryComponents:[EregistratransComponent]
})
export class EnlaceModule { }
