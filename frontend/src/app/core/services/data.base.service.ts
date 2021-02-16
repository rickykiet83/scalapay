import { Observable } from 'rxjs/internal/Observable';

import { HttpService } from './http.service';

export interface IDbServiceBase<T> {
    get(uri: string): Observable<T>;
    put(uri: string, data: T);
    post(uri: string, data: T);
    delete(uri: string, key: string, id: any);
    postFile(uri: string, files: File, postData?: any);
}
export abstract class DataServiceBase<T> extends HttpService {
    protected abstract get(uri: string): Observable<T>;
    protected abstract getAll(uri: string): Observable<T[]>;
    protected abstract update(uri: string, data: T);
    protected abstract post(uri: string, data: T);
    protected abstract delete(uri: string, key: string, id: any);
    protected abstract postFile(uri: string, files: File, postData?: any);
}
