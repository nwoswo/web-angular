import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GsecUsuario } from 'src/app/model/gsecUsuario';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {

  @Input() public usuCUsuario: number;
  form: FormGroup;

  constructor(fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private service: UsuarioService,
    public toastr: ToastrService
    ) {

    this.form = fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword // your validation method

    })

  }
  onSubmit() {
console.log(this.form);

    if (!this.form.valid) {
      return
    }



      this.service.updatePassword(this.usuCUsuario,this.form.controls.confirmPassword.value).subscribe(rpta=>{

        if(rpta.sCOD==='0000')
        {
          this.toastr.success("Operacion Completada");
        }else
        {
          this.toastr.error("Error Contacte con el Area de Sistemas  ");
        }

        this.activeModal.close();

      })

//this.activeModal.close();



  }

}


export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {

     let password = AC.get('password').value; // to get value in input tag
     let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
      if(password != confirmPassword) {
          console.log('false');
          AC.get('confirmPassword').setErrors( {MatchPassword: true} )
      } else {
          console.log('true');
          return null
      }
  }
}
