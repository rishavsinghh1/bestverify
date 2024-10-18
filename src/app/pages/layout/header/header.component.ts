import { Component } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { SessionstorageService } from '../../../service/sessionstorage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private _apiservice:ApiService,private _StorageService:SessionstorageService) { 
    this._StorageService.clearUserData('loginsession');
  }

  isAuthenticated() {
    return this._apiservice.isAuthenticated();
  }
}
