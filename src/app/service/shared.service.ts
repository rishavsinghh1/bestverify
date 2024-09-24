import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // A Map to store data by key
  private dataMap: Map<string, BehaviorSubject<any>> = new Map();

  // Initialize key with empty BehaviorSubject if not exists
  private initializeKey(key: string): void {
    if (!this.dataMap.has(key)) {
      this.dataMap.set(key, new BehaviorSubject<any>(null));
    }
  }

  // Add or update data
  setData(key: string, value: any): void {
    this.initializeKey(key);
    this.dataMap.get(key)?.next(value);
  }

 

  // Get data as Observable
  getData(key: string): Observable<any> {
    this.initializeKey(key);
    return this.dataMap.get(key)!.asObservable();
  }

  // Delete data
  deleteData(key: string): void {
    this.dataMap.delete(key);
  }

  // Get all data (as an object)
  getAllData(): { [key: string]: any } {
    const allData: { [key: string]: any } = {};
    this.dataMap.forEach((subject, key) => {
      allData[key] = subject.value;
    });
    return allData;
  }
}
