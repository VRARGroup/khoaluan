import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { sp } from '../model/sanpham';

@Injectable({
	providedIn: 'root'
})
export class SanphamService {
	url = 'https://localhost:44309/api/sanphamdienthoai';
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		})
	};
	constructor(private http: HttpClient) { }

	getsp_idlsp(id: number): Observable<sp[]> {
		return this.http.get<sp[]>(this.url + '/' + 'getidsploaisp?idloaisap=' + id);
	}

	getctsp(id: number): Observable<sp[]> {
		return this.http.get<sp[]>(this.url + '/' + id);
	}

	getkmhotsp_idlsp(id: number): Observable<sp[]> {
		return this.http.get<sp[]>(this.url + '/' + 'getidspkmhotloaisp?idloaisap=' + id);
	}
	get_sp_noi_bat(): Observable<sp[]> {
		return this.http.get<sp[]>(this.url + '/' + 'get_sp_noi_bat');
	}
	gettensp(tensp: string): Observable<sp[]> {
		return this.http.get<sp[]>(this.url + '/' + 'getsp_idloaisp?tensp=' + tensp);
	}

	gethotsp(): Observable<sp[]> {
		return this.http.get<sp[]>(this.url + '/hotsp');
	}

	createsp(s: sp): Observable<sp> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.post<sp>(this.url + '/', s, httpOptions);
	}

	deletesp(idsp: number): Observable<number> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.delete<number>(this.url + '/' + idsp, httpOptions);
	}

	creategtsp(s: sp): Observable<sp> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.put<sp>(this.url + '/' + 'gt?_id=' + s._id, s, httpOptions);
	}

	updatesp(s: sp): Observable<sp> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.put<sp>(this.url + '/' + 'updatesp?_id=' + s._id, s, httpOptions);
	}

	get_product_details(id: number): Observable<sp[]> {
		return this.http.get<sp[]>(this.url + '/' + 'get_product_details?idsp=' + id);
	}

	get_same_products(id: number): Observable<sp[]> {
		return this.http.get<sp[]>(this.url + '/' + 'get_same_products?idsp=' + id);
	}

	get_same_price_products(id: number): Observable<sp[]> {
		return this.http.get<sp[]>(this.url + '/' + 'get_same_price_products?idsp=' + id);
	}

	get_list_product(idlsp: number) {
		return this.http.get<sp[]>(this.url + '/' + 'get_list_product?idlsp=' + idlsp);
	}

	get_more_list_product(idlsp: number) {
		return this.http.get<sp[]>(this.url + '/' + 'get_more_list_product?idlsp=' + idlsp);
	}

	get_list_product_category(idlsp: number) {
		return this.http.get<sp[]>(this.url + '/' + 'get_list_product_category?idlsp=' + idlsp);
	}

	get_list_product_price(idlsp: number) {
		return this.http.get<sp[]>(this.url + '/' + 'get_list_product_price?idlsp=' + idlsp);
	}

	// get_list_suggest_category(idlsp: number,arrthuonghieu: string[]) {
	// 	return this.http.get<sp[]>(this.url + '/' + 'get_list_suggest_category?idlsp=' + idlsp +"&&"+ "arrthuonghieu=" + arrthuonghieu);
	// }

	get_allsp(): Observable<sp[]> {
		return this.http.get<sp[]>(this.url + '/'+ 'allsp');
	}
}
