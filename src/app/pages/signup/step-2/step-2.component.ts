import { Component } from '@angular/core';
import { CommonService } from '../../../service/common.service';
import { SessionstorageService } from '../../../service/sessionstorage.service';

@Component({
  selector: 'app-signup-step-2',
  standalone: true,
  imports: [],
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.scss'
})
export class Step2Component {
constructor(private  _commonservice:CommonService,private _sessionstore:SessionstorageService){

}
ngOnInit(){

  let data = this._sessionstore.getUserData('step1signup');
  console.log(data);
}

goToPrevious(){

}

}
