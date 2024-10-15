import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './pages/layout/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { SessionstorageService } from './service/sessionstorage.service';
import { NgIf } from '@angular/common';
import { CommonService } from './service/common.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,DashboardComponent,HeaderComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bestverify';
  userData:any;

  constructor(private _StorageService:SessionstorageService,private _commonservice:CommonService){
    this.userData =  this._StorageService.getUserData('loginsession');
    if(!this.userData){
      this._commonservice.data$.subscribe(data => {
        console.log(`dd`,data);
        
        this.userData =data;
      });
    }
  }
  
  ngOnInit() { 
      
      
  }
}
