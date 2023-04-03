import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PbandejaComponent } from './pbandeja/pbandeja.component';
import { PregistrarSolicitudComponent } from './pregistrar-solicitud/pregistrar-solicitud.component';
import { PconsultasolicitudComponent } from './pconsultasolicitud/pconsultasolicitud.component';
import { PentregaAcuseComponent } from './pentrega-acuse/pentrega-acuse.component';
import { PmensajeriaComponent } from './pmensajeria/pmensajeria.component';



const routes: Routes = [
  { path: 'mbandeja', component: PbandejaComponent},
  { path: 'mCsolicitudesD1', component: PconsultasolicitudComponent},
  { path: 'mCsolicitudesD2', component: PconsultasolicitudComponent},
  { path: 'mCsolicitudesD3', component: PconsultasolicitudComponent},
  { path: 'mCsolicitudesD4', component: PconsultasolicitudComponent},

  { path: 'mEntregaAcuse', component: PentregaAcuseComponent},
  { path: 'mMensajeria', component: PmensajeriaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlataformaRoutingModule { }
