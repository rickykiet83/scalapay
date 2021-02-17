import { FormlyModule } from '@ngx-formly/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { CoreModule } from '../../core/core.module';
import { OrderComponent } from './components/order/order.component';
import { FormlyMaterialModule } from '@ngx-formly/material';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders'
  },
  {
    path: 'orders',
    component: OrderComponent
  }
];

@NgModule({
  declarations: [OrderComponent],
  imports: [
      RouterModule.forChild(routes), CoreModule, FuseWidgetModule,
      FormlyModule.forRoot(),
      FormlyMaterialModule
    ]
})
export class ECommerceModule {}
