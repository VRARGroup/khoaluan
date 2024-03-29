import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { lsanpham } from '../model/loaisanpham';
import { nav } from '../model/navbar';

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

	getth(): Observable<string[]> {
    	return this.http.get<string[]>(this.url+'/thuonghieu');
	}
	  
	getnav(): Observable<nav[]> {
    	return this.http.get<nav[]>(this.url+'/nav');
  	}  

  	getdetaillsp(id: any): Observable<lsanpham[]> {
    	return this.http.get<lsanpham[]>(this.url+ '/' + id);
	}
	  
	createlsp(lsp: lsanpham): Observable<lsanpham> {
    	const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    	return this.http.post<lsanpham>(this.url + '/', lsp, httpOptions);
	}

	deletelsp(idlsp: number): Observable<number> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.delete<number>(this.url + '/'+ idlsp, httpOptions);
	}

	updatelsp(lsp:lsanpham): Observable<lsanpham> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    	return this.http.put<lsanpham>(this.url + '/'+ 'updatelsp?_id='+lsp._id, lsp, httpOptions);
	}
	  
	check_tieuchidanhgia(idsp): Observable<Boolean>
	{
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    	return this.http.get<Boolean>(this.url + '/'+ 'check_tieuchidanhgia?_id='+idsp);
	}	
}
