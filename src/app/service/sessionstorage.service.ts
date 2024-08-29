import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionstorageService {

  constructor() { }
 // Set user data in sessionStorage
 setUserData(key:any,userData: any): void {
  sessionStorage.setItem(key, JSON.stringify(userData));
}

// Get user data from sessionStorage
getUserData(key:any): any {
  const storedData = sessionStorage.getItem(key);
  if (storedData) {
    return JSON.parse(storedData);
  }
  return null; // Or return a default value or handle as needed
}

// Clear user data from sessionStorage
clearUserData(key:any): void {
  sessionStorage.removeItem(key);
}
}
