import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreasRoutingModule } from './areas-routing.module';
import { AbandejaComponent } from './abandeja/abandeja.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArespuestaComponent } from './modal/arespuesta/arespuesta.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  declarations: [AbandejaComponent, ArespuestaComponent],
  imports: [
    CommonModule,
    AreasRoutingModule,NgbModule,FormsModule,ReactiveFormsModule,SharedModule
  ],
  providers:[SolicitudService],
  entryComponents:[ArespuestaComponent,AbandejaComponent]
})
export class AreasModule { }
