import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './components/body/body.component';
import { MenuComponent } from './components/body/menu/menu.component';
import { BuscarFileComponent } from './components/buscarFile/buscarFile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './components/inicio/inicio.component';

@NgModule({
  declarations: [	
    AppComponent,
    BodyComponent,
    MenuComponent,
    BuscarFileComponent,
    InicioComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
