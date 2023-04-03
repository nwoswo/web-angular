import { Area } from './area';
import { Archivo } from './archivos';

export class Informacion {
    id: number;
  
    detalle: string;
    fecha: Date;
    estado :number;
    area:Area;
    hoja:string;
    lArchivos:Archivo[];
   
  
    constructor (area:Area,detalle:string,hoja:string){

        this.area = area;
        this.detalle = detalle;
        this.id = new Date().getTime();
        this.fecha= new Date();
        this.estado= 1;
        this.hoja=hoja;
        this.lArchivos=[];
    }

  }
  