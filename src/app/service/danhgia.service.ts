import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { dg } from '../model/danhgia';
import { dgphu } from '../model/danhgia';
import { bangghepdg_sp } from '../model/bangghepdg_sp';

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

  getalldg_idsp(id:number): Observable<dg[]> {
		return this.http.get<dg[]>(this.url+"/danhgia?_id="+id);
  }

  getalldgphu(id:number): Observable<dgphu[]> {
		return this.http.get<dgphu[]>(this.url+"/danhgiaphu?_id="+id);
  }
  
  getdg_idsp(id:number): Observable<dg[]> {
		return this.http.get<dg[]>(this.url+"/"+id);
  }
  
  insert_binhluan_danhgia(d:dg): Observable<dg> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.put<dg>(this.url+"/"+d._id,d);
  }

  get_danhgia_1day(): Observable<any[]> {
		return this.http.get<any[]>(this.url+"/get_danhgia_1day");
  }

  get_danhgia_1day_idsp(id:number): Observable<dg[]> {
		return this.http.get<dg[]>(this.url+"/get_danhgia_1day_idsp?_id_sp="+id);
  }

  get_danhgia_choseday_idsp(id:number, d:String): Observable<dg[]> {
		return this.http.get<dg[]>(this.url+"/get_danhgia_choseday_idsp?_id_sp="+id +"&&"+"d="+d );
  }
}
