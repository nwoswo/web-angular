import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { tsocSolicitud } from 'src/app/model/tsocSolicitud';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {


  f: FormGroup;
  vsolicitudes: tsocSolicitud[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private solService: SolicitudService
    ) {

    this.f = this.formBuilder.group({
      textbuscar:new FormControl('',[Validators.required,Validators.minLength(8)])
    });

   }

  ngOnInit() {
  }


  buscar()
  {

    console.log("this.f.value.textbuscar="+this.f.value.textbuscar);

    this.solService.getSolicitudes('',this.f.value.textbuscar).subscribe(
      servicios => {

        this.vsolicitudes = servicios;
        this.f.reset();
       // console.log(this.vsolicitudes);

      }
    );


  }


}
