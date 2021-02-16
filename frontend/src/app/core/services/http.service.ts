import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private readonly _urlApi = environment.baseAPI;
    private  _httpOptions = {};
    constructor(
        protected http: HttpClient,
    ) { }

    protected get urlApi(): string {
        return this._urlApi;
    }

    protected get httpOptions(): {} {
        return (this._httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + this.token
            })
        });
    }

    get token(): string {
        return '';
    }

}
