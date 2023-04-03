import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { BuscarFileComponent } from './components/buscarFile/buscarFile.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  { path: '', redirectTo: 'init', pathMatch: 'full' },
  
  { path:'init', component: InicioComponent},
  {
    path: 'app', component: BodyComponent,
    children: [
      {
        path: 'buscar/:tipo', component: BuscarFileComponent
      },
    ],
  },

  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
