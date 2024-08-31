import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { endpoint } from '../../service/endpoint';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {


  constructor(private _apiservice:ApiService){}
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
