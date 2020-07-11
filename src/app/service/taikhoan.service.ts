import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tk } from '../model/taikhoan';

@Injectable({
  providedIn: 'root'
})
export class TaikhoanService {

  url= 'https://localhost:44309/api/taikhoan';
  httpOptions = {  
      headers: new HttpHeaders({  
          'Content-Type': 'application/json; charset=utf-8'  
      })  
  }; 
  constructor(private http: HttpClient) { }

  gettk(): Observable<tk[]> {
    return this.http.get<tk[]>(this.url);
  }

  getfilltertk(id:number): Observable<tk[]> {
    return this.http.get<tk[]>(this.url+'/'+"filtertk?_id="+id);
  }

  getfilltertkgroup(): Observable<tk[]> {
    return this.http.get<tk[]>(this.url+'/'+"detailtkgroup");
  }

  getcttk(u:string, p:string): Observable<tk[]> {
    return this.http.get<tk[]>(this.url+'/'+"detailtk?u="+u+"&&"+"p="+p);
  }

  getcttk_id(id:number): Observable<tk[]> {
    return this.http.get<tk[]>(this.url+'/'+id);
  }

  updatehdtk(id:number): Observable<tk> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<tk>(this.url + '/'+ 'dangxuattk?_id='+id, httpOptions);
  }
  
  updateqtk(t:tk): Observable<tk> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<tk>(this.url + '/'+ 'quyen?_id='+t._id,t, httpOptions);
  }
  
  updatetk(t:tk): Observable<tk> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<tk>(this.url + '/'+t._id,t, httpOptions);
  }

  update_idq_tk(id:number, _idq:number): Observable<tk> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<tk>(this.url + '/'+ 'chanquyen?_id='+id+"&&"+"_idq="+_idq, httpOptions);
  }
  
  createtk(t:tk): Observable<tk> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<tk>(this.url + '/',t, httpOptions);
  }

  deletetk(idtk: number): Observable<number> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.delete<number>(this.url + '/'+ idtk, httpOptions);
	}
  
}
