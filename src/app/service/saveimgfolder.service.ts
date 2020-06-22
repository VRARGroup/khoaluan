import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { imgfolder } from '../model/image';


@Injectable({
  providedIn: 'root'
})
export class SaveimgfolderService {

  url= 'https://localhost:44309/api/saveimagefolder';
  	httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/json; charset=utf-8'  
        })  
    };
  constructor(private http: HttpClient) { }
  
  saveimagefolder(s:imgfolder): Observable<imgfolder> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<imgfolder>(this.url + '/', s, httpOptions);
  }
}
