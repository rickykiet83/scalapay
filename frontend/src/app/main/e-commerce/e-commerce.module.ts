import { ProductsService } from './services/products.service';
import { FormlyModule } from '@ngx-formly/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { CoreModule } from '../../core/core.module';
import { OrderComponent } from './components/order/order.component';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { OrderService } from './services/order.service';
import { ProductsComponent } from './components/products/products.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders'
  },
  {
    path: 'orders',
    component: OrderComponent
  },
  {
    path: 'products',
    component: ProductsComponent,
    resolve  : {
        data: ProductsService
    }
  },
];

@NgModule({
  declarations: [OrderComponent, ProductsComponent],
  imports: [
    RouterModule.forChild(routes),
    CoreModule,
    FuseWidgetModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule
  ],
  providers: [OrderService, ProductsService]
})
export class ECommerceModule {}
