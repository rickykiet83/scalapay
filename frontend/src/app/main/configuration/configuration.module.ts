import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { ConfigurationComponent } from './components/configuration/configuration.component';


const routes = [
    {
        path     : 'configuration',
        component: ConfigurationComponent
    }
];


@NgModule({
  declarations: [ConfigurationComponent],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule
  ]
})
export class ConfigurationModule {}
