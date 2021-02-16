import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, filter, finalize, map, retry, shareReplay } from 'rxjs/operators';

import { SystemConstants } from '../common/system.constants';
import { MessageConstants } from './../common/message.constants';
import { DataServiceBase } from './data.base.service';

@Injectable({
  providedIn: 'root'
})
export abstract class DataService<T> extends DataServiceBase<T> {

    constructor(
        http: HttpClient,
        protected fuseProgressBarService: FuseProgressBarService,
        protected notificationSvc: HotToastService,
    ) {
        super(http);
    }

    abstract className(): string;

    protected getAll(uri: string): Observable<T[]> {
        return this.http.get<T[]>(uri, this.httpOptions).pipe(
            filter(response => !!response),
            map((response: T[]) => response),
            retry(SystemConstants.RETRY_TIMES), // retry a failed request up to x times
            catchError(err => this.handleError(err, this.className())),
            finalize(() => this.fuseProgressBarService.hide())
        );
    }

    protected get(uri: string): Observable<T> {
        this.fuseProgressBarService.show();
        return this.http.get<T>(uri, this.httpOptions).pipe(
            filter(response => !!response),
            map((response: T) => response),
            retry(SystemConstants.RETRY_TIMES), // retry a failed request up to x times
            catchError(err => this.handleError(err, this.className())),
            finalize(() => this.fuseProgressBarService.hide())
        );
    }

    protected post(uri: string, data: Partial<T>): Observable<T | any> {
        this.fuseProgressBarService.show();
        return this.http.post<T>(uri, data, this.httpOptions).pipe(
            filter(response => !!response),
            map((response: T) => response),
            retry(SystemConstants.RETRY_TIMES), // retry a failed request up to x times
            catchError(err => this.handleError(err, this.className())),
            finalize(() => this.fuseProgressBarService.hide())
        );
    }

    protected update(uri: string, data?: Partial<T>): Observable<T> {
        this.fuseProgressBarService.show();
        return this.http.put<T>(uri, data, this.httpOptions).pipe(
            filter(response => !!response),
            map((response: T) => response),
            retry(SystemConstants.RETRY_TIMES), // retry a failed request up to x times
            shareReplay(),
            catchError(err => this.handleError(err, this.className())),
            finalize(() => this.fuseProgressBarService.hide())
        );
    }

    handleError(error: HttpErrorResponse, functionName = this.className()) {
        // console.error(error);
        // console.log('Error function: ', functionName);
        if (error.error instanceof Array) {
            error.error.forEach(err => console.log(err.Code, err.Description));

        } else if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);

        } else if (error?.error?.responseException) {
            const errors = error.error.responseException.errors;
            if (errors instanceof Array) {
                errors.forEach(err => console.log(err.Code, err.Description));
            }
        }
         // error authentication
        else if (error.status === 0) {
            // this.localStorageSvc.removeItem(StoreConstants.CURRENT_USER);
            this.notificationSvc.error(MessageConstants.UNKNOWN_ERROR);
            // this.routingSvc.toHome();
            // this.store.dispatch(new ActionAuthLogout());
        }
        else if (error.status === 401) {
            // this.localStorageSvc.removeItem(StoreConstants.CURRENT_USER);
            this.notificationSvc.error(MessageConstants.FORBIDDEN);
            // this.routingSvc.toHome();
        } else if (error.status === 403) {
            // this.localStorageSvc.removeItem(StoreConstants.CURRENT_USER);
            this.notificationSvc.error(MessageConstants.FORBIDDEN);
            // this.routingSvc.toLogin();
            // this.routingSvc.toHome();
        } else if (error.status === 406) {
            // this.localStorageSvc.removeItem(StoreConstants.CURRENT_USER);
            this.notificationSvc.error(MessageConstants.INVALID_TOKEN);
            // this.routingSvc.toHome();
            // this.store.dispatch(new ActionAuthLogout());
        } else if (error?.error?.responseException) {
            const code = error.error.responseException.code;
            const message = error.error.responseException.message || error.error.responseException.description || error.error.responseException.exceptionMessage;
            this.notificationSvc.error(message);
        } else if (error.status === 400) {
            this.notificationSvc.error(error.error.message);
        }

        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` + `body was: ${error.message}`
            );
        }

        // return an observable with a user-facing error message
        // return throwError('Something bad happened; please try again later.');
        return throwError(error);
    }

}
