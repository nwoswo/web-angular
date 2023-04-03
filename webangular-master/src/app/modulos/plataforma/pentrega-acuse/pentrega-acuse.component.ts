import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pentrega-acuse',
  templateUrl: './pentrega-acuse.component.html',
  styleUrls: ['./pentrega-acuse.component.css']
})
export class PentregaAcuseComponent implements OnInit {

  constructor() { }

  data_select :Idatos;
  
  ngOnInit() {
  }


  onItemChange(item:Idatos){
    this.data_select = item;
    console.log("chjange="+this.data_select );
   }


  datossolicitud = 
  [
    { hoja: '100001', nombre: 'MARLENE ORTEGA PINEDA', celular: '931425101', fecha: '01/07/2019' ,estado:6 },
    { hoja: '100002', nombre: 'WILBERT MAMANI SALGUERO', celular: '12345678', fecha: '01/07/2019',estado:6 },
   
  ];

  

}

interface Idatos {
  hoja: string;
  nombre: string;
  celular: string;
  fecha: string;
}