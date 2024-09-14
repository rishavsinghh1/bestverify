import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() {}
  ngOnInit(): void {}

  _tosterMessage(message: any,icon:any): any {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: icon,
        title: message
      });
  }


  _successaAlert(message:any,icon:any){
    Swal.fire({
      icon: icon,
      title: message,
      showConfirmButton: true,
      //timer: 1000
    })
  }

  // _swalMessage(res:any){
  //   if (res.statuscode == 200 && res.responsecode == 1) {
  //     Swal.fire({
  //       icon: 'success',
  //       //title: res.msg,
  //       title: res.message,
  //       showConfirmButton: false,
  //       timer: 1000
  //     })
  //   }
  //   else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: res.message,
  
  //     });
  //   }
  // }
}
