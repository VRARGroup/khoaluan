import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { dsq } from '../model/danhsachquyen';

@Injectable({
  providedIn: 'root'
})
export class DanhsachquyenService {

  url= 'https://localhost:44309/api/danhsachquyen';
  httpOptions = {  
      headers: new HttpHeaders({  
          'Content-Type': 'application/json; charset=utf-8'  
      })  
  }; 
  constructor(private http: HttpClient) { }

  getdanhsachquyen(): Observable<dsq[]> {
    return this.http.get<dsq[]>(this.url);
  }

  getdetaildanhsachquyen(id:number): Observable<dsq[]> {
    return this.http.get<dsq[]>(this.url+"/"+id);
  }

  deletedsq(iddsq: number): Observable<number> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.delete<number>(this.url + '/'+ iddsq, httpOptions);
  }

  creatdsq(d:dsq): Observable<number> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.post<number>(this.url, d, httpOptions);
	}
}
