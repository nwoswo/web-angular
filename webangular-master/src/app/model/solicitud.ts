import { Informacion } from './informacion';
import { Archivo } from './archivos';

export class Solicitud {
    hoja: string;
    nombre: string;
    celular: string;
    fecha: Date;
    estado :number;
    reqadd:number;
    direccion:string;
    ubigeo:string;
    referencia:string;
    oficio:string;
    lInformacion:Informacion[];
    lArchivos:Archivo[];

    difdays:number;
    constructor (titulo:string){
       
        this.fecha= new Date();
        this.lArchivos=[];
    }
  }
  