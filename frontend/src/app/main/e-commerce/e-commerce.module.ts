import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { CoreModule } from '../../core/core.module';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders'
  },
  {
    path: 'orders',
    component: OrdersComponent
  }
];

@NgModule({
  declarations: [OrdersComponent],
  imports: [RouterModule.forChild(routes), CoreModule,
    FuseWidgetModule]
})
export class ECommerceModule {}
