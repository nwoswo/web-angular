export class Archivo {
    id: string;
    nombre: string;
    fecha: Date;
    estado :number;
   
  
    constructor (id:string,nombre:string){

      
        this.id = new Date().getTime()+"."+nombre.split('.').pop();
        this.nombre = id;
        this.fecha= new Date();
        this.estado= 1;
    }
  }
  