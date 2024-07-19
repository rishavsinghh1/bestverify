import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-top-header',
  standalone: true,
  imports: [RouterLink,NgClass,NgFor],
  templateUrl: './top-header.component.html',
  styleUrl: './top-header.component.scss'
})
export class TopHeaderComponent { 
  tabList = [
    {
      name: 'Contact Details',
      subname: 'Contact',
      heading:'Choose your shipping options',
      active: true, 
      url:'/kyc/intro',
      icon: 'fa-regular fa-address-book',
    },
    {
      name: 'Business Details',
      subname: 'Business',
      active: false,
      url:'/kyc/bussiness-detail',
      heading:'Choose your shipping options',
      icon: 'fas fa-briefcase',
    },
    {
      name: 'Verify Documents',
      active: false,
      subname: 'Verify',
      url:'/kyc/verify-document',
      heading:'Choose your shipping options',
      icon: 'far fa-file-alt',
    } 
  ];
  ngOnInit() {
  }


  tabClick(stepValue:string) { 
   // this.activeState = stepValue;
   this.tabList.find((item) => {
    // if (name === item.name) {
    //   item.active = true;
    // } else {
    //   item.active = false;
    // }
    item.active = stepValue === item.subname;
  });
      console.log('====================================');
      console.log(this.tabList);
      console.log('====================================');
  }

}
