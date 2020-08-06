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

  get_binhluan_1day_idspp(id:number): Observable<bl[]> {
		return this.http.get<bl[]>(this.url+"/get_binhluan_1day_idsp?_id_sp="+id);
  }

  get_binhluan_choseday_idsp(id:number, d:String): Observable<bl[]> {
		return this.http.get<bl[]>(this.url+"/get_binhluan_choseday_idsp?_id_sp="+id + "&&"+"d="+d );
  }

  get_binhluan_1day(): Observable<any[]> {
		return this.http.get<any[]>(this.url+"/get_binhluan_1day");
  }

  deletebl(idbl: number): Observable<number> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.delete<number>(this.url + '/'+ idbl, httpOptions);
	}

}
