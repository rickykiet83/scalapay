import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../../core/core.module';
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

    CoreModule,
  ]
})
export class ConfigurationModule {}
