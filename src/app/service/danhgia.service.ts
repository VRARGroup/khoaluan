import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { dg } from '../model/danhgia';

@Injectable({
  providedIn: 'root'
})
export class DanhgiaService {

  url= 'https://localhost:44309/api/danhgia';
  httpOptions = {  
      headers: new HttpHeaders({  
          'Content-Type': 'application/json; charset=utf-8'  
      })  
  }; 

  constructor(private http: HttpClient) { }

  creatdg(d:dg): Observable<number> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.post<number>(this.url, d, httpOptions);
  }
  
  getalldg(): Observable<dg[]> {
		return this.http.get<dg[]>(this.url);
  }
  
  getdg_idsp(id:number): Observable<dg[]> {
		return this.http.get<dg[]>(this.url+"/"+id);
  }
  
  insert_binhluan_danhgia(d:dg): Observable<dg> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.put<dg>(this.url+"/"+d._id,d);
	}
}
