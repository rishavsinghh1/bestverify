import { Component } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { Router } from '@angular/router';
import { endpoint } from '../../../service/endpoint';
import { SessionstorageService } from '../../../service/sessionstorage.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private _apiservice:ApiService,private route:Router,private _StorageService:SessionstorageService){}
  logout(){
    console.log('hlw');
    let obj ={};
    this._apiservice._postData(obj,endpoint.auth.userlogout).subscribe((resp: any) => {
     if(resp.status && resp.statuscode == 200){
       this._StorageService.clearUserData('loginsession');
      this.route.navigateByUrl('/login');
     }
    })
  }
}
