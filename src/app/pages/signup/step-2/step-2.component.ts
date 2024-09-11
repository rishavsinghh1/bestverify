import { Component } from '@angular/core';
import { CommonService } from '../../../service/common.service';

@Component({
  selector: 'app-signup-step-2',
  standalone: true,
  imports: [],
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.scss'
})
export class Step2Component {
constructor(private  _commonservice:CommonService){

}
ngOnInit(){
  this._commonservice.data$.subscribe((res:any)=>{
    console.log(res);
    
  
  })
}

goToPrevious(){

}

}
