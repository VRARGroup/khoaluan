import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { grp } from '../model/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  url= 'https://localhost:44309/api/group';
  httpOptions = {  
      headers: new HttpHeaders({  
          'Content-Type': 'application/json; charset=utf-8'  
      })  
  }; 
  constructor(private http: HttpClient) { }

  getgrp(): Observable<grp[]> {
    return this.http.get<grp[]>(this.url);
  }

  getdetaillgrp(id: any): Observable<grp[]> {
    return this.http.get<grp[]>(this.url+ '/' + id);
  }

  updategroup(s:grp): Observable<grp> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    	return this.http.put<grp>(this.url + '/'+ s._id, s, httpOptions);
	}
}
