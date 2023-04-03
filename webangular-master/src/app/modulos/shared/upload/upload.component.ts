import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tsocSolicitud } from 'src/app/model/tsocSolicitud';
import { Transaccion } from 'src/app/model/trancaccion';
import { ToastrService } from 'ngx-toastr';
import { AppConstants } from 'src/app/model/AppConstants';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  URL: string;
  solCDocumento: number;
  rinCRequerimiento: number;
  arcEArchivo: number;
  arcCTipo:number;
  uptipo:number;

  namefile:string; //Nombre de archivo parametrizado para enviado desde la web

  formImport: FormGroup;
  fileToUpload: File = null;
  public uploader: FileUploader;
  @Output() event: EventEmitter<any> = new EventEmitter();
  @ViewChild('labelImport')
  labelImport: ElementRef;


  constructor(
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private dataService: DataService
    ) {



    this.formImport = new FormGroup({

      uploader: new FormControl('', Validators.required)
    });


  }




  validatePDF(objFileControl){

    var len = objFileControl.length;
    var ext = objFileControl.slice(len - 4, len);
    if( ext.toUpperCase() == ".PDF" ){
      return true;
    }
    else{
    return false;
    }
   }



  ngOnInit() {


    if(this.uptipo===1){
     this.URL =  AppConstants.baseURL+'/sifonavic5/rest/archivos/upload';

    }
    if(this.uptipo===2){
     this.URL = AppConstants.baseURL+'/sifonavic5/rest/archivos/uploadReq';
    }


    this.uploader = new FileUploader({
      url:  this.URL,
      headers: [{ name: 'Authorization', value: 'Bearer '+this.dataService.getToken() }],

      itemAlias: 'avatar'
       });

    this.uploader.onAfterAddingFile = (file) => {
    file.withCredentials = false;



                                                            if(!this.validatePDF(file.file.name))
                                                            {
                                                              this.toastr.warning("Solo Arhivos PDF");
                                                              this.activeModal.close();
                                                            }
                                                        //

                                                              this.labelImport.nativeElement.innerText = file.file.name;
    };

    this.uploader.onBeforeUploadItem = (item: FileItem) => {





      item.withCredentials = false;
      this.formImport.disable();
      this.uploader.options.additionalParameter = {



        solCDocumento: this.solCDocumento,
        rinCRequerimiento: this.rinCRequerimiento,
        arcCTipo : this.arcCTipo,
        usuCUsuario : this.dataService.getusuCUsuario(),
        areCArea : this.dataService.getareCArea(),
        mynamefile : this.namefile


      };
    };


    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {


      let trx:Transaccion = JSON.parse(response);
      if (trx.sCOD == '0000') {
        this.toastr.success("Operación Completada");
        this.event.emit(true);
      }
      else {
        this.toastr.error("Error codigo :  " + trx.sDESCOD);
        this.event.emit(false);
      }
      this.activeModal.close();
    };
  }




}
