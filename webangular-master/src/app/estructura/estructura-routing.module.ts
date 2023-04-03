import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstructuraComponent } from './estructura.component';


const routes: Routes = [
  { path: '', redirectTo: 'mestructura', pathMatch: 'full' },
  {
    path: 'mestructura', component: EstructuraComponent,
    children: [
      {
        path: 'musuario', loadChildren: '../modulos/usuario/usuario.module#UsuarioModule'
      },
      {
        path: 'mplataforma', loadChildren: '../modulos/plataforma/plataforma.module#PlataformaModule'
      },
      {
        path: 'menlace', loadChildren: '../modulos/enlace/enlace.module#EnlaceModule'
      }
      ,
      {
        path: 'mareas', loadChildren: '../modulos/areas/areas.module#AreasModule'
      }
    

    ]
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstructuraRoutingModule {

  ngOnInit() {



  }

}
