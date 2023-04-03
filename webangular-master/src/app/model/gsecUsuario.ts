export class GsecUsuario {

    usuCUsuario: number;
    usuDUsuario: string;
    usuDPassword: string;
    //short
    shorttraDNombre: string;

    tracArea: TracArea;
    //ARE_C_AREA
    areCArea:string;

    //USU_E_USUARIO
    usuEUsuario:number;

    //USU_N_UBIGEO
    usuNUbigeo:number;

    gpecPersona: GpecPersona;

    constructor() {

        this.gpecPersona = new GpecPersona();
        this.tracArea = new TracArea();

    }

}


export class TracArea {


    //ARE_C_AREA
    areCArea:number;


}


export class GpecPersona {


    traCCodigo: number;
    traNNrodoc:string;
    traDApepat:string;
    traDApemat:string;
    traDNombres:string;
    traCSexos:number;
    traNCelular:string;



}




