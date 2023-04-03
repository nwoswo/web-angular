import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit {

  @Output() event: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }


  confirm(): void {
  
    this.event.emit(true);
    
  }
 
  decline(): void {
   
    this.event.emit(false);
  
  }

}
