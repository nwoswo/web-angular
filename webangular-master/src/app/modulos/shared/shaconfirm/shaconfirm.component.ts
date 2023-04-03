import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-shaconfirm',
  templateUrl: './shaconfirm.component.html',
  styleUrls: ['./shaconfirm.component.css'],
  providers: [NgbModule]
})
export class ShaconfirmComponent {

  @Output() event: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) { }



  confirm(): void {

    this.event.emit(true);

  }

  decline(): void {

    this.event.emit(false);

  }

}



