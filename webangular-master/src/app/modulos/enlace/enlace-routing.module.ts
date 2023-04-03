import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EbandejaComponent } from './ebandeja/ebandeja.component';
import { EgacuseComponent } from './egacuse/egacuse.component';
import { ErinformacionComponent } from './erinformacion/erinformacion.component';
import { EconsultasolicitudComponent } from './econsultasolicitud/econsultasolicitud.component';





const routes: Routes = [
  { path: 'ebandeja', component: EbandejaComponent},
  { path: 'egacuse', component: EgacuseComponent},
  { path: 'erequerimiento', component: ErinformacionComponent},

  { path: 'eCsolicitudesD1', component: EconsultasolicitudComponent},
  { path: 'eCsolicitudesD2', component: EconsultasolicitudComponent},
  { path: 'eCsolicitudesD3', component: EconsultasolicitudComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnlaceRoutingModule { }
