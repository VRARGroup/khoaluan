import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { lsanpham } from '../model/loaisanpham';

@Injectable({
  providedIn: 'root'
})
export class LoaisanphamService {
	url= 'https://localhost:44309/api/loaisanpham';
  	httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
        })  
    }; 
  	constructor(private http: HttpClient) { }

  	getlsp(): Observable<lsanpham[]> {
    	return this.http.get<lsanpham[]>(this.url);
  	}

  	getdetaillsp(id: any): Observable<lsanpham[]> {
    	return this.http.get<lsanpham[]>(this.url+ '/' + id);
	  }
	  
	createlsp(lsp: lsanpham): Observable<lsanpham> {
    	const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    	return this.http.post<lsanpham>(this.url + '/', lsp, httpOptions);
  	}

}
