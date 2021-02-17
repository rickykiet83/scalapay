import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { NotificationService } from '../../../../core/services/notification.service';
import { BaseComponent } from '../../../../shared/base-component/base-component.component';
import { orderStatuses } from './order-statuses';
import { Order } from './order.model';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class OrderComponent extends BaseComponent implements OnInit {
  order: Order;
  orderStatuses: any;
  statusForm: FormGroup = new FormGroup({});

  constructor(
    fuseTranslationLoaderService: FuseTranslationLoaderService,
    notifcationService: NotificationService,
    private _formBuilder: FormBuilder
  ) {
    super(fuseTranslationLoaderService, notifcationService);
    // Set the defaults
    this.order = new Order();
    this.orderStatuses = orderStatuses;
  }

  ngOnInit() {
    super.ngOnInit();

    this.statusForm = this._formBuilder.group({
        newStatus: ['']
    });
  }

  /**
   * Update status
   */
  updateStatus(): void {
    const newStatusId = Number.parseInt(this.statusForm.get('newStatus').value);

    if (!newStatusId) {
      return;
    }

    const newStatus = this.orderStatuses.find((status) => {
      return status.id === newStatusId;
    });

    newStatus['date'] = new Date().toString();

    this.order.status.unshift(newStatus);
  }
}
