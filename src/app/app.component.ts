import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './pages/layout/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { SessionstorageService } from './service/sessionstorage.service';
import { NgIf } from '@angular/common';
import { CommonService } from './service/common.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,DashboardComponent,HeaderComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bestverify';
  private readonly _sessionStorageService = inject(SessionstorageService);
  private readonly _commonservice = inject(CommonService);
  public isLogin = signal(false);
  userData:any;
  
  ngOnInit() {
    this._commonservice.getLoginStatus.subscribe((res) => {
      if(res){
        this.isLogin.set(true)
      }else{
        this.isLogin.set(false);
      }
    })
  }


  isLoginUser = computed(() => {
    if (this.isLogin()) {
      return true
    } else {
      return this._sessionStorageService.getUserData('loginsession') ? true : false
    }
  });

}
