import { Component } from '@angular/core';
import { SharedService } from '../../../service/shared.service';

@Component({
  selector: 'app-selct-company-type',
  standalone: true,
  imports: [],
  templateUrl: './selct-company-type.component.html',
  styleUrl: './selct-company-type.component.scss'
})
export class SelctCompanyTypeComponent {
constructor(private sharedService:SharedService){

}

goToPrevious(){

}
addcompny(){
  let data = {
    "companyId":45
  }
  this.sharedService.setData('compnyId', data);
}
}
