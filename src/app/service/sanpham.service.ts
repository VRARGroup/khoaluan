import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { sp } from '../model/sanpham';

@Injectable({
  providedIn: 'root'
})
export class SanphamService {
	url= 'https://localhost:44309/api/sanphamdienthoai';
  	httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
        })  
    }; 
  	constructor(private http: HttpClient) { }

	getsp_idlsp(id:number): Observable<sp[]> {
    	return this.http.get<sp[]>(this.url+'/'+'getidsploaisp?idloaisap='+id);
  	}
	
	gettensp(tensp:string): Observable<sp[]> {
    	return this.http.get<sp[]>(this.url+'/'+'getsp_idloaisp?tensp='+tensp);
	}
	  
  	createsp(s: sp): Observable<sp> {
    	const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    	return this.http.post<sp>(this.url + '/', s, httpOptions);
  	}
}
