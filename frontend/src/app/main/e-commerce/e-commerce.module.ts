import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { CoreModule } from '../../core/core.module';
import { OrderComponent } from './components/order/order.component';

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
  imports: [RouterModule.forChild(routes), CoreModule, FuseWidgetModule]
})
export class ECommerceModule {}
