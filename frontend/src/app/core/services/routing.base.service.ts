import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UrlConstants } from '../common/url.constants';


@Injectable({
    providedIn: 'root'
})
export abstract class RoutingServiceBase {
    protected routingName: string;
    constructor(
        protected route: Router,
    ) {}

    public toUrl(url: string) {
        this.route.navigateByUrl(url);
    }

    public toHome() {
        this.route.navigateByUrl(UrlConstants.HOME);
    }

    // authentication
    public toLogin() {
        this.route.navigateByUrl(UrlConstants.AUTH + UrlConstants.LOGIN);
    }

    public toExternalUrl(url: string) {
        window.location.href = url;
    }

    public toLogout() {
        // this.store.dispatch(new ActionAuthLogout());
        this.route.navigateByUrl(UrlConstants.AUTH + UrlConstants.LOGOUT);
    }
}
