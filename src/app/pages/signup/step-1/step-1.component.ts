import { Component } from '@angular/core';
import { CommonService } from '../../../service/common.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../../../service/shared.service';

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.scss'
})
export class Step1Component {
  step1Signup:any=FormGroup;
  registerData: any[] = [];


constructor (private sharedService: SharedService){

}


    addRegisterData(newItem: any): void {
      this.sharedService.setData('step1signup', newItem);
    }

    submitStep1(){
      let data = {
        "fname":"rishav",
        "lanme":"singh" 
      }
      this.addRegisterData(data); 
    }

}
