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
  userbalance:any;
  constructor(private _apiservice:ApiService){
    let obj ={};

    this._apiservice._postData(obj,endpoint.auth.balance).subscribe((resp: any) => { 
      this.userbalance=resp.balance;
      console.log('====================================');
      console.log(`data`,resp);
      console.log('====================================');
    })
  }
  //console/userBalance
  logout(){
    console.log('hlw');
    let obj ={};
    this._apiservice._postData(obj,endpoint.auth.logout).subscribe((resp: any) => { 
      console.log('====================================');
      console.log(`user-logout`,resp);
      console.log('====================================');
    })
  }
}
