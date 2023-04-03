import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbandejaComponent } from './abandeja/abandeja.component';

const routes: Routes = [
  { path: 'abandeja', component: AbandejaComponent}
  
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreasRoutingModule { }
