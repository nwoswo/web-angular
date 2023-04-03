import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IDocumento } from 'src/app/core/models/idocumento';
import { VisorService } from 'src/app/core/services/visor.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-buscarFile',
  templateUrl: './buscarFile.component.html',
  styleUrls: ['./buscarFile.component.css']
})
export class BuscarFileComponent implements OnInit {

  myForm: FormGroup;
  public vsubmit=true;
  page = 1;
  ldocumentos: IDocumento[] = [];
  totalpages:number;
  public url = environment.url;
  tipoBusqueda:string;


  constructor(
    private fb: FormBuilder,
    private visorService:VisorService,
    private route :ActivatedRoute
  ) { 
    this.myForm =  fb.group({

      tDocumento: ['RUC', ],
      numero: ['', ],
      razonsocial: ['', ],
      documento: ['', ]


    });
    
    let id = parseInt(this.route.snapshot.paramMap.get('tipo'))
    console.log('idxxxxxxxx:',id);
    switch(id) { 
      case 1: { 
         this.tipoBusqueda='EMPLEADORES';
         break; 
      } 
      case 2: { 
        this.tipoBusqueda='EMPLEADORES TRAMITES';
         break; 
      } 
      case 3: { 
        this.tipoBusqueda='RESOLUCIONES ADMINISTRATIVAS';
         break; 
      } 
    }
    
  }

  ngOnInit() {
    this.vsubmit = false;

    


  }

  openurl(file){
    window.open(`${this.url}/api/file?fileName=${file}.pdf`, '_blank');  
  }

  public onPageChange(pageNum: number): void {
    console.log(pageNum);
    this.page = pageNum;
    this.onSubmit();
  }


  onSubmit() {
    console.log('this.myForm.value: ', this.myForm.value);
    console.log('this.page: ', this.page);
    this.visorService.findjuridica( this.myForm.value, this.page || 1).subscribe(
      rpta=> {
        console.log(rpta);
        this.ldocumentos = rpta;
        if(this.ldocumentos.length>0){
          this.totalpages = this.ldocumentos[0].tnumpages;
        }
      }
    );
   
  }

  listar(){
    
  }

  myonBlurNumero(){

    if(this.myForm.value.numero!=''){

      this.numero.setValidators([Validators.required, Validators.minLength(11),Validators.maxLength(11)]);
    }if(this.myForm.value.numero==''){
      this.numero.clearValidators();
    }
    this.vsubmit = this.numero.valid;
    

    this.numero.updateValueAndValidity()
    if(this.myForm.valid) this.vsubmit =true
  }

  myonBlurRazonSocial(){
    console.log('myonBlurRazonSocial:',this.myForm.value.razonsocial.trim(),'-');
    if(this.myForm.value.razonsocial.trim()!=''){

      this.razonsocial.setValidators([Validators.required, Validators.minLength(8)]);
    }else{
      this.razonsocial.clearValidators();
    }
    this.vsubmit = this.razonsocial.valid;
    this.razonsocial.updateValueAndValidity()
    
    if(this.myForm.valid) this.vsubmit =true
  }

  myonBlurDocumento(){

    if(this.myForm.value.documento!=''){

      this.documento.setValidators([Validators.required, Validators.minLength(8)]);
    }if(this.myForm.value.documento==''){
      this.documento.clearValidators();
    }
    this.vsubmit = this.documento.valid;

    this.documento.updateValueAndValidity()
    if(this.myForm.valid) this.vsubmit =true
  }



 
  get numero() { return this.myForm.get('numero') as FormControl; }
  get razonsocial() { return this.myForm.get('razonsocial') as FormControl; }
  get documento() { return this.myForm.get('documento') as FormControl; }

  numericOnly(event): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }

}
