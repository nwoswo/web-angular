import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { ConsultaComponent } from './modulos/consulta/consulta/consulta.component';

const routes: Routes = [

  { path: '', redirectTo: 'login',pathMatch:'full' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'mestructura', loadChildren: './estructura/estructura.module#EstructuraModule' ,runGuardsAndResolvers: 'always',canActivate:[AuthGuardService]},
  { path: 'consulta', component: ConsultaComponent }
 // { path: 'mplataforma', loadChildren: './estructura/estructura.module#EstructuraModule' },
 // { path: 'menlace', loadChildren: './estructura/estructura.module#EstructuraModule' },


];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true,onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
