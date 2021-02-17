import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { fuseConfig } from './fuse-config';
import { LayoutModule } from './layout/layout.module';
import { AuthenticationModule } from './main/authentication/authentication.module';
import { ConfigurationModule } from './main/configuration/configuration.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        // RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
        AppRoutingModule,

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        ConfigurationModule,
        AuthenticationModule,
        ReactiveFormsModule,
        FormlyModule.forRoot({ extras: { lazyRender: true } }),
        FormlyMaterialModule,
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
