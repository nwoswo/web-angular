import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GsecUsuario } from 'src/app/model/gsecUsuario';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of  } from 'rxjs';
import { Transaccion } from 'src/app/model/trancaccion';
import { AppConstants } from 'src/app/model/AppConstants';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };




@Injectable()
export class UsuarioService {

  public servicioUrl = AppConstants.baseURL+'/sifonavic5/rest/usuario'; // URL to web API
  public usuarios: GsecUsuario[] = [];
  public usuario: GsecUsuario;
  public errorMessage: string;



  constructor(
    private http: HttpClient
  ) {

  }


  public getUsuarios(): Observable<GsecUsuario[]> {
    return this.http
    .get<GsecUsuario[]>(this.servicioUrl+"/usuarios")
    .pipe(catchError(this.handleError('getUsuarios', [])) );
    }

    public  create(usuario: GsecUsuario): Observable<Transaccion> {
      return this.http.post<Transaccion>(this.servicioUrl+"/registrar",JSON.stringify(usuario), httpOptions)
    }

/*
      public update(usuario: GsecUsuario): Observable<Transaccion> {

      return this.http.put<Transaccion>(this.servicioUrl+"/updateEstado/"+usuario.usuCUsuario, httpOptions) }

*/
      public updateDatos(usuario: GsecUsuario): Observable<Transaccion> {
        return this.http.put<Transaccion>(this.servicioUrl+"/updateUsuario/"+usuario.usuCUsuario,
        JSON.stringify(usuario), httpOptions)
      }


      public update(usuario: GsecUsuario): Observable<Transaccion>  {
          console.log(JSON.stringify(usuario));
          return this.http.put<Transaccion>(this.servicioUrl+"/updateEstado",JSON.stringify(usuario), httpOptions);
        }


     public  updatePassword(usuCUsuario: number, usuDPassword:string): Observable<Transaccion> {
          return this.http.post<Transaccion>(this.servicioUrl+"/updatePassword",{ "usuCUsuario": usuCUsuario, "usuDPassword": usuDPassword}, httpOptions)
     }



    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
      console.error("usuario.service error= "+error); // log to console instead
      return of(result as T);
      };
    }



}
