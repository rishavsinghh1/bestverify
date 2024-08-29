import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { endpoint } from '../../service/endpoint';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private _apiservice:ApiService){
    let obj ={};
    this._apiservice._postData(obj,endpoint.auth.balance).subscribe((resp: any) => { 
      console.log('====================================');
      console.log(`data`,resp);
      console.log('====================================');
    })
  }
  //console/userBalance

}
