import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IDocumento } from 'src/app/core/models/idocumento';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VisorService {
private url = environment.url;


constructor(
  private http: HttpClient
) { }

  public findjuridica({numero, razonsocial, documento},page){

    let params = new HttpParams();

    params = params.append('numero', numero);
    params = params.append('razonsocial', razonsocial);
    params = params.append('documento', documento);
    params = params.append('page', page);
    

    return this.http
      .get<IDocumento[]>(this.url + "/api/findjuridica", { params: params } );
  }
}
