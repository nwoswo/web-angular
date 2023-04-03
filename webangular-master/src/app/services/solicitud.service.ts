import { Injectable } from '@angular/core';
import { HttpHeaders,  } from '@angular/common/http';

import { HttpClient } from '@angular/common/http';

import { Observable,of} from 'rxjs';
import { Transaccion } from 'src/app/model/trancaccion';
import { tsocSolicitud } from '../model/tsocSolicitud';
import { catchError, map, tap } from 'rxjs/operators';
import { tsoDArchivos } from '../model/tsoDArchivos';
import { tsodReqinf } from '../model/tsodReqinf';
import { DataService } from './data.service';
import { AppConstants } from '../model/AppConstants';

const httpOptions = {
  headers: new HttpHeaders({
    //'Content-Type': 'application/json',
    //'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1NzIzNjA5OTQsInN1YiI6Ik1QQVJURVMiLCJhdWRpZW5jZSI6IndlYiIsImNyZWF0ZWQiOjE1NzE3NTYxOTQ3MDh9.3k-MpY4v4GhrPzeYTtK437TS8acj4rvbJ-eKU8jxWjkvcItsCv3B6eGKfsDBIyGTZ_xUdkStxLKgqoPZV2qstg'

  })
};



@Injectable()
export class SolicitudService {


  public servicioUrl =  AppConstants.baseURL+'/sifonavic5/rest/solicitud'; // URL to web API
  public servicioArchivoUrl = AppConstants.baseURL+'/sifonavic5/rest/archivos'; // URL to web API
  public servicioReqInfUrl = AppConstants.baseURL+'/sifonavic5/rest/reqinf'; // URL to web API



  //public solicitud: tsocSolicitud;
  public solicitudTmp: tsocSolicitud;



  constructor(
    private http: HttpClient,
    private dataService:DataService
  ) {
    this.solicitudTmp= new tsocSolicitud();
  }




//----------------------------req inf

    public  registrarReqinf(data: tsodReqinf): Observable<Transaccion> {

      console.log(JSON.stringify(data));

      return this.http.post<Transaccion>(this.servicioReqInfUrl+"/registrar",JSON.stringify(data), httpOptions);
    }


    public  updatePregunta(data: tsodReqinf): Observable<Transaccion> {
      return this.http.put<Transaccion>(this.servicioReqInfUrl+"/updatePregunta",JSON.stringify(data), httpOptions);
    }



    public getlistReqinf(solCDocumento:number): Observable<tsodReqinf[]> {
    return this.http
    .get<tsodReqinf[]>(this.servicioReqInfUrl+"/list/"+solCDocumento,httpOptions)
    }

    public getlistReqinfBA(areCArea:number,rinEstado:number): Observable<tsodReqinf[]> {
      return this.http
      .get<tsodReqinf[]>(this.servicioReqInfUrl+"/listBA?areCArea="+areCArea+"&rinEstado="+rinEstado,httpOptions)
      }


      public  respuestaReqinf(data: tsodReqinf): Observable<Transaccion> {
        console.log("update req inf");
        console.log(JSON.stringify(data));
        return this.http.put<Transaccion>(this.servicioReqInfUrl+"/respuesta",JSON.stringify(data), httpOptions);
      }

      public  delReqInf(rinCRequerimiento: number): Observable<Transaccion> {
        return this.http.delete<Transaccion>(this.servicioReqInfUrl+"/delReqInf/"+rinCRequerimiento, httpOptions);
      }

//------------------------------------Archivos



  public getlistArchivos(solCDocumento:number,arcCTipo:number): Observable<tsoDArchivos[]> {


  return this.http
  .get<tsoDArchivos[]>(this.servicioArchivoUrl+"/listxSol?solCDocumento="+solCDocumento+"&arcCTipo="+arcCTipo,httpOptions)
  }


  public getlistArchivosReq(rinCRequerimiento:number,arcCTipo:number): Observable<tsoDArchivos[]> {

    return this.http
    .get<tsoDArchivos[]>(this.servicioArchivoUrl+"/listxReq?rinCRequerimiento="+rinCRequerimiento+"&arcCTipo="+arcCTipo,httpOptions)
    }


    public  registrarAcuse(data: any): Observable<Transaccion> {
      return this.http.post<Transaccion>(this.servicioArchivoUrl+"/acuse",JSON.stringify(data), httpOptions);
    }

    public  deleteArchivo(arcCArchivo: number): Observable<Transaccion> {
      return this.http.delete<Transaccion>(this.servicioArchivoUrl+"/delete/"+arcCArchivo, httpOptions);
    }





//------------------------------------Solicitud


  public findDNI(tipodoc:string,dni:string): Observable<Transaccion> {
    console.log("findDNI-------------");
  return this.http
  .get<Transaccion>(this.servicioUrl+"/findDNI?param1="+tipodoc+"&param2="+dni,httpOptions)
  }


    public getSolicitudes(solESolicitud:string,solNHoja:string): Observable<tsocSolicitud[]> {
    return this.http
    .get<tsocSolicitud[]>(this.servicioUrl+"/list?param1="+solESolicitud+"&param2="+solNHoja,httpOptions)
    }


    public  registrarSolicitud(solicitud: tsocSolicitud): Observable<Transaccion> {

      console.log(solicitud);

      let estado:number;
    if(this.dataService.getareCArea()===3)
    {estado=1;}else
    {estado=10;  }

      solicitud.solESolicitud=estado;
      solicitud.solCOrigen=estado;



      solicitud.usuCUsuario=this.dataService.getusuCUsuario();
      return this.http.post<Transaccion>(this.servicioUrl+"/registrar",JSON.stringify(solicitud), httpOptions);
    }

    public updateEstadoSol(idSolicitud:number,estado:number,usuCUsuario:number): Observable<Transaccion>  {

      this.solicitudTmp.solCDocumento=idSolicitud;
      this.solicitudTmp.solESolicitud=estado;
      this.solicitudTmp.usuCUsuario=this.dataService.getusuCUsuario();

      return this.http.put<Transaccion>(this.servicioUrl+"/updateEstado",JSON.stringify(this.solicitudTmp), httpOptions);

    }

    public updateDatosSol(solicitud: tsocSolicitud): Observable<Transaccion>  {

      solicitud.usuCUsuario=this.dataService.getusuCUsuario();
      return this.http.put<Transaccion>(this.servicioUrl+"/updateDatosSol",JSON.stringify(solicitud), httpOptions);

    }




    public updateFEntrega(solCDocumento:number): Observable<Transaccion>  {


      return this.http.put<Transaccion>(this.servicioUrl+"/updateFEntrega",

      { "solCDocumento": solCDocumento }, httpOptions);

    }







}
