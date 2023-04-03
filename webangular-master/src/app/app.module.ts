import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ErrorHandler,LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';



//Interceptor

import { GlobalErrorHandler } from './global-error-handler';
import { ServerErrorInterceptor } from './server-error.interceptor';

//animaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { DataService } from './services/data.service';



//import { ElarchivosComponent } from './modulos/shared/elarchivos/elarchivos.component';




import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/es';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ConsultaComponent } from './modulos/consulta/consulta/consulta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitudService } from './services/solicitud.service';
registerLocaleData(localeFr);


@NgModule({
  declarations: [
    AppComponent,
    ConsultaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    FormsModule,ReactiveFormsModule

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    DataService,
    { provide: LOCALE_ID, useValue: 'es-US' },
    SolicitudService
  ],
  exports: [
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
