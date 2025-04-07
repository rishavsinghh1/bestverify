
import { Component, inject } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { Router, RouterLink } from '@angular/router';
import { endpoint } from '../../../service/endpoint';
import { SessionstorageService } from '../../../service/sessionstorage.service';
import { CommonService } from '../../../service/common.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly _apiservice = inject(ApiService)
  private readonly route = inject(Router)
  private readonly _storageService = inject(SessionstorageService)
  private readonly _commonService = inject(CommonService)
  logout(){
    let obj ={};
    this._apiservice._postData(obj,endpoint.auth.userlogout).subscribe((resp: any) => {
      if(resp.statuscode == 200 && resp.responsecode == 1){
        this._storageService.clearUserData('loginsession');
        this.route.navigate(['/login']);
        const header = document.querySelector('app-header');
        const sidebar = document.querySelector('app-sidebar');
        if (header) {
          header.remove();
        }
        if (sidebar) {
          sidebar.remove();
        }
        this._storageService.clearUserData('loginsession');
        this.route.navigate(['/login']);
      }
    })
  }
}
