import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { bl } from '../model/binhluan';


@Injectable({
  providedIn: 'root'
})
export class BinhluanService {

  url= 'https://localhost:44309/api/binhluan';
  httpOptions = {  
      headers: new HttpHeaders({  
          'Content-Type': 'application/json; charset=utf-8'  
      })  
  };

  constructor(private http: HttpClient) { }

  creatbl(b:bl): Observable<bl> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.post<bl>(this.url, b, httpOptions);
  }

  insert_binhluan_phu(b:bl): Observable<bl> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.put<bl>(this.url+"/"+b._id,b);
	}

  getallbl_idsp(id:number): Observable<bl[]> {
		return this.http.get<bl[]>(this.url+"/binhluan_idsp?_id="+id);
  }
  
  getallbl(): Observable<bl[]> {
		return this.http.get<bl[]>(this.url);
  }

}
