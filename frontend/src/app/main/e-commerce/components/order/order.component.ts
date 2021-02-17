import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { NotificationService } from '../../../../core/services/notification.service';
import { BaseComponent } from '../../../../shared/base-component/base-component.component';
import { OrderModel } from '../../../../shared/models/order.model';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class OrderComponent extends BaseComponent implements OnInit {
  order: OrderModel;

  constructor(
    fuseTranslationLoaderService: FuseTranslationLoaderService,
    notifcationService: NotificationService,
    private _formBuilder: FormBuilder
  ) {
    super(fuseTranslationLoaderService, notifcationService);
    // Set the defaults
    this.order = new OrderModel();
  }

  ngOnInit() {
    super.ngOnInit();
  }
}

