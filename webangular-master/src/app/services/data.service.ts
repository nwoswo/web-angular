import { Injectable } from '@angular/core';
import { Solicitud } from '../model/solicitud';
import { Area } from '../model/area';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tsocArea } from '../model/tsocArea';
import { Observable } from 'rxjs';
import { datosUsuarioModel } from '../model/datosUsuarioModel';
import { Transaccion } from '../model/trancaccion';
import { ApiResponse } from '../model/apiResponse';
import { AppConstants } from '../model/AppConstants';


//const t='Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1NzIyOTEyMTQsInN1YiI6Ik1QQVJURVMiLCJhdWRpZW5jZSI6IndlYiIsImNyZWF0ZWQiOjE1NzE2ODY0MTQ0MTR9.fPjO9874F2IpXr6jroBD7q7mOzZFZe6TDASmMCpioKTXUW05D9qia4EpYL2mQA4Vm-FIWWG3PJD76QQ3eo1h8w'
//var headers_object = new HttpHeaders().set("Authorization", t);
/*
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1NzIyOTEyMTQsInN1YiI6Ik1QQVJURVMiLCJhdWRpZW5jZSI6IndlYiIsImNyZWF0ZWQiOjE1NzE2ODY0MTQ0MTR9.fPjO9874F2IpXr6jroBD7q7mOzZFZe6TDASmMCpioKTXUW05D9qia4EpYL2mQA4Vm-FIWWG3PJD76QQ3eo1h8w'
});
*/
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    //'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1NzIyOTEyMTQsInN1YiI6Ik1QQVJURVMiLCJhdWRpZW5jZSI6IndlYiIsImNyZWF0ZWQiOjE1NzE2ODY0MTQ0MTR9.fPjO9874F2IpXr6jroBD7q7mOzZFZe6TDASmMCpioKTXUW05D9qia4EpYL2mQA4Vm-FIWWG3PJD76QQ3eo1h8w'

  })
};

const servicioUrl = AppConstants.baseURL+'/jwtrans/auth'; // URL to web API
const dataoUrl = AppConstants.baseURL+'/sifonavic5/data'; // URL to web API

@Injectable({
  providedIn: 'root'
})
export class DataService {


  public lareas:tsocArea[]=[];
  private userToken:string;
  muser:datosUsuarioModel=null;

  constructor(private http: HttpClient) {
   }





   public getlistAreas(){

//console.log("listareas=")
   return   this.http
     .get<tsocArea[]>(dataoUrl+"/listareas",httpOptions );
     }





//-------------------------------------------------------------------------------------------------------------------------
//get info token sessionStorage

  getusuCUsuario():number
  {
    //this.muser=JSON.parse(atob(sessionStorage.getItem('muser')));
    this.muser=JSON.parse(sessionStorage.getItem('muser'));
    return this.muser.usuCUsuario;
  }


  getareCArea():number
  {
    //this.muser=JSON.parse(atob(sessionStorage.getItem('muser')));
    this.muser=JSON.parse(sessionStorage.getItem('muser'));


    return this.muser.areCArea;
  }



  isLogged()
  {
    //console.log(sessionStorage.getItem('muser'));


    if(sessionStorage.getItem('muser')==null)
    {
      //console.log(false);
    return false;

    }else{
      //console.log(true);

    return true;
  }
  }

  getMuser()
  {
    //this.muser=JSON.parse(atob(sessionStorage.getItem('muser')));
    this.muser=JSON.parse(sessionStorage.getItem('muser'));
    return this.muser;
  }


  getToken()
  {
    if(sessionStorage.getItem('token'))
    {
      this.userToken = sessionStorage.getItem('token');
    }else{
      this.userToken='';
    }
    return this.userToken;
  }


  estaAutenticado():boolean{

    console.log("this.userToken.length="+this.userToken.length);
    if(this.userToken.length<2)
    return false;

    const expira = Number(sessionStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if(expiraDate > new Date()){
      return true;
    }else{
      return false;
    }


  }


  // FIN get info token sessionStorage


  //Manage Session Token


  guardarMuser(muser:any)
  {
      //sessionStorage.setItem('muser',btoa(JSON.stringify(muser))) ;
      sessionStorage.setItem('muser',JSON.stringify(muser));
      this.muser=muser;
  }


  guardarToken(idToken:string)
  {
      this.userToken=idToken;
      sessionStorage.setItem('token',idToken);

      let hoy = new Date();
      hoy.setSeconds( 3600 );
      sessionStorage.setItem('expira',hoy.getTime().toString());
  }


  public  login(email:string,password:string,areCArea:number): Observable<ApiResponse> {
    const authData = {
      username:email.toUpperCase(),
      password:password,
      areCArea:areCArea
    };

    console.log(JSON.stringify(authData));
    return this.http.post<ApiResponse>(servicioUrl+"/generate-token",JSON.stringify(authData), httpOptions);
  }




    logout(){
      sessionStorage.removeItem('muser');
      sessionStorage.removeItem('expira');
      sessionStorage.removeItem('token');
      this.muser=null;
    }


  //FIN  - Manage Session Token




  public idarea;

  public listaSol:Solicitud[] =

  [
    { hoja: '2019001', nombre: 'MARLENE ORTEGA PINEDA', celular: '931425101', fecha: new Date(2019,5,12),estado :5,reqadd:0,direccion:"JR NAZCA 458",ubigeo:"LIMA - LIMA - JESUS MARIA",referencia:"FRENTE AL CAMPO DE MARTE",oficio:'',lInformacion:<any>[],difdays:0,lArchivos:[]},
    { hoja: '2019002', nombre: 'WILBERT MAMANI SALGUERO', celular: '12345678', fecha: new Date(2019,5,11), estado:5,reqadd:0,direccion:"CALLE LAS CAUTIVAS 133 URB REMIGIO SILVA",ubigeo:"LAMBAYEQUE - CHICLAYO - CHICLAYO",referencia:"2DA CDRA DE LA AV BELAUNDE",oficio:'',lInformacion:<any>[],difdays:0,lArchivos:[]},
    { hoja: '2019003', nombre: 'CARLOS AUGUSTO CARPIO HUAMAN', celular: '59761167', fecha: new Date(2019,5,10), estado:5,reqadd:0 ,direccion:"CALLE GABRIELA MISTRAL NRO 255 URB LA CALERA DE LA MERCED",ubigeo:"LIMA - LIMA - SURQUILLO",referencia:"FRENTE AL COLEGIO PARTICULAR STA CECILIA",oficio:'',lInformacion:<any>[],difdays:0,lArchivos:[]},
  ];


getLsolicitudes(variable:number)
{


  return this.listaSol.filter(data=> data.estado!==variable );
}




getObtenerSolicitud(id:string|number)
   {
    return this.listaSol.find( listadata=> listadata.hoja===id);
   }



getDataGenders(){
  return this.genders;
}


  private genders:any[] = [
    { value: 1, display: 'Femenino' },
    { value: 2, display: 'Masculino' }
  ];


  //Login ------------------------------------------------------ Menu --------------------------------------------------



  getDataUrlRoot(){
    return this.urlroot;
  }
  public urlroot:any[] =
  [
    { value: 'musuario', display: 'Registrar Usuario' }
  ];



  getDataUrlPlataforma(){
    return this.urlplataforma;
  }
  public urlplataforma:any[] =
  [
    { value: 'mplataforma/mbandeja', display: 'Bandeja Solicitud', id: 11},
    //{ value: 'mplataforma/mCsolicitudesD', display: 'Consultar Solicitudes Derivadas'},
    { value: 'mplataforma/mCsolicitudesD4', display: 'Solicitudes Derivadas', id: 13  }

  ];








  getDataUrlMesaPartes(){
    return this.urlmesapartes;
  }
  public urlmesapartes:any[] =
  [

      { value: 'mplataforma/mbandeja', display: 'Bandeja Solicitud' , id: 11},
      { value: 'mplataforma/mCsolicitudesD1', display: 'Solicitudes Derivadas', id: 10  },
      { value: 'mplataforma/mCsolicitudesD2', display: 'Solicitudes por Entregar', id: 11  },
      { value: 'mplataforma/mCsolicitudesD3', display: 'Solicitudes Entregadas', id: 12  }
  ];







  getDataUrlEnlace(){
    return this.urlenlace;
  }

  public urlenlace:any[] =
  [
    { value: 'menlace/ebandeja', display: 'Bandeja Solicitud'},
    { value: 'menlace/eCsolicitudesD1', display: 'Derivados a Mensajeria', id: 10  },
    { value: 'menlace/eCsolicitudesD2', display: 'Derivados a Mesa de Partes', id: 11  }//,
    //{ value: 'menlace/eCsolicitudesD3', display: 'No califican como Transparencia', id: 12  }

  ];



getDataUrlBeneficiarios(idarea:number){
  this.idarea=idarea;
  let urlbeneficiarios =
  [
    { value: 'mareas/abandeja', display: 'Bandeja Requerimientos', id: this.idarea }
  ];
  return urlbeneficiarios;
}


 getDataUrlLegal(idarea:number){
    this.idarea=idarea;
    let urlLegal:any[] =
    [
      { value: 'mareas/abandeja', display: 'Bandeja Requerimientos', id: this.idarea }
    ];
    return urlLegal;
  }

  getDataUrlEmpleadores(idarea:number){
    this.idarea=idarea;
    let urlEmpleadores:any[] =
    [
      { value: 'mareas/abandeja', display: 'Bandeja Requerimientos', id: this.idarea }
    ];
    return urlEmpleadores;
  }

  getDataUrlConstruccion(idarea:number){
    this.idarea=idarea;

    let urlConstruccion:any[] =
    [
      { value: 'mareas/abandeja', display: 'Bandeja Requerimientos', id: this.idarea }
    ];

    return urlConstruccion;

  }



  getDataUrlMensajeria(){
    return this.urlmensajeria;
  }

    public urlmensajeria:any[] =
    [
      { value: 'mplataforma/mMensajeria', display: 'Bandeja Requerimientos', id: this.idarea }

    ];




}
