import { Component } from '@angular/core';
import { SharedService } from '../../../service/shared.service';
import { FormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import Swal from 'sweetalert2';
import { endpoint } from '../../../service/endpoint';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-selct-company-type',
  standalone: true,
  imports: [AutocompleteLibModule],
  templateUrl: './selct-company-type.component.html',
  styleUrl: './selct-company-type.component.scss'
})
export class SelctCompanyTypeComponent {
  companylist:any;
constructor(private sharedService:SharedService,private _apiservice:ApiService){
  console.log('hlw');
  this.keyword = 'name';
  let obj={
    type:1,
    latitude:'25.5940947',
    longitude:'25.5940947',
  }
  this._apiservice._postData(obj,endpoint.auth.companylist).subscribe((resp: any) => {
  this.companylist=(resp);

  this.companylist.forEach((companylists: any, index: any) => {
    console.log(`Fruit at index ${index}: ${companylists}`);
  });
  //console.log('companylist',this.companylist);
  
  });

}

goToPrevious(){

}
addcompny(){
  let data = {
    "companyId":45
  }
  this.sharedService.setData('compnyId', data);
}

keyword = 'name';
public countries = [
  {
    id: 1,
    name: 'Albania',
  },
  {
    id: 2,
    name: 'Belgium',
  },
  {
    id: 3,
    name: 'Denmark',
  },
  {
    id: 4,
    name: 'Montenegro',
  },
  {
    id: 5,
    name: 'Turkey',
  },
  {
    id: 6,
    name: 'Ukraine',
  },
  {
    id: 7,
    name: 'Macedonia',
  },
  {
    id: 8,
    name: 'Slovenia',
  },
  {
    id: 9,
    name: 'Georgia',
  },
  {
    id: 10,
    name: 'India',
  },
  {
    id: 11,
    name: 'Russia',
  },
  {
    id: 12,
    name: 'Switzerland',
  }
];

selectEvent(item:any) {
  // do something with selected item
}

onChangeSearch(search: string) {
  // fetch remote data from here
  // And reassign the 'data' which is binded to 'data' property.
}

onFocused(e:any) {
  // do something
}




}

