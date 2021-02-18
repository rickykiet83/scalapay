import { Observable } from 'rxjs/internal/Observable';
import { Order, OrderModel } from './../../../shared/models/order.model';
import { Injectable } from '@angular/core';
import { DataService } from 'app/core/services/data.service';

@Injectable()
export class OrderService extends DataService<Order> {
  getApiUrl(): string {
    return `${this.urlApi}/orders`;
  }

  className(): string {
    return OrderService.name;
  }

  createOrder(data: OrderModel): Observable<{token: string, expires: string, checkoutUrl: string}> {
      return super.post(this.getApiUrl(), data.toJSON());
  }
}
