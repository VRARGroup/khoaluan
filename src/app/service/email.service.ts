import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { email } from '../model/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  url= 'https://localhost:44309/api/email';
  httpOptions = {  
      headers: new HttpHeaders({  
          'Content-Type': 'application/json; charset=utf-8'  
      })  
  }; 

  constructor(private http: HttpClient) { }

  sendmail(e:email): Observable<email> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.post<email>(this.url+"/send-email", e, httpOptions);
  }

}
