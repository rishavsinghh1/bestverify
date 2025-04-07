import { Component } from '@angular/core';
import { SessionstorageService } from '../../../service/sessionstorage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileFrm:FormGroup;
  userdetails:any;
  constructor(public router: Router,private _sessionStore:SessionstorageService,private _fb:FormBuilder) { 
    this.userdetails=this._sessionStore.getUserData('loginsession');
    console.log('userdata',this.userdetails);
    this.profileFrm=this._fb.group({
      name:[''],
      username:[''],
      firmname:['']
    });
    this.profileFrm.patchValue['name'],this.userdetails.data.name;
  
console.log('patch_Value',this.profileFrm.patchValue['name'],this.userdetails.data.name);
  }
}
