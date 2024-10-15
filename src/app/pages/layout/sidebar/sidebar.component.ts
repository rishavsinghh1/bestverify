import { Component } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { Router } from '@angular/router';
import { endpoint } from '../../../service/endpoint';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private _apiservice:ApiService,private route:Router){}
  logout(){
    console.log('hlw');
    let obj ={};
    this._apiservice._postData(obj,endpoint.auth.logout).subscribe((resp: any) => {
     if(resp.status && resp.statuscode == 200){
      sessionStorage.removeItem('loginsession');
      this.route.navigateByUrl('/login');
     }
    })
  }
}
