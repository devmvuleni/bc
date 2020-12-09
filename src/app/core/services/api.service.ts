import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Data {
  base: string;
  rates: any;
  date: string;
}

export interface HistoryData {
  base: string;
  end_at: string;
  start_at: string;
  rates: any;
}

export interface Units {
  name: string;
  symbol: any;
  measurement: string;
}



@Injectable({
  providedIn: 'root'
})
export class ApiService {

private baseURL: string = 'https://api.ratesapi.io/api/';
private localDataset = '../../../assets/data/units.json';

 constructor(private httpClient: HttpClient) { }
 getRates(): Observable<Data[]> {
   return this.httpClient.get(this.baseURL + 'latest') as Observable<Data[]>;
 }

 getHistoryByWeek(currency): Observable<HistoryData[]> {
  return this.httpClient.get(this.baseURL + 'history?start_at=2020-12-01&end_at=2020-12-07&symbols=' + currency) as Observable<HistoryData[]>;
 }

 getUnits(): Observable<Units[]> {
    return this.httpClient.get(this.localDataset) as Observable<Units[]>;
  }
}
