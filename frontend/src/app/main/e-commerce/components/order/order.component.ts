import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FormlyFieldConfig } from '@ngx-formly/core';

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
  order: OrderModel = new OrderModel({
    totalAmount: {
      amount: '40.70',
      currency: 'EUR'
    },
    consumer: {
      phoneNumber: '0400000001',
      givenNames: 'Joe',
      surname: 'Consumer',
      email: 'test@scalapay.com'
    },
    billing: {
      name: 'Joe Consumer',
      line1: 'Via della Rosa, 23',
      suburb: 'Montelupo Fiorentino',
      postcode: '50056',
      countryCode: 'IT',
      phoneNumber: '0400000000'
    },
    shipping: {
      name: 'Joe Consumer',
      line1: 'Via della Rosa, 23',
      suburb: 'Montelupo Fiorentino',
      postcode: '50056',
      countryCode: 'IT',
      phoneNumber: '0400000000'
    },
    items: [
      {
        name: 'T-Shirt',
        category: 'clothes',
        subcategory: ['shirt', 'long-sleeve'],
        brand: 'TopChoice',
        gtin: '123458791330',
        sku: '12341234',
        quantity: 1,
        price: {
          amount: '10.00',
          currency: 'EUR'
        }
      },
      {
        name: 'Jeans',
        category: 'clothes',
        subcategory: ['pants', 'jeans'],
        brand: 'TopChoice',
        gtin: '123458722222',
        sku: '12341235',
        quantity: 1,
        price: {
          amount: '20.00',
          currency: 'EUR'
        }
      }
    ],
    discounts: [
      {
        displayName: '10% Off',
        amount: {
          amount: '3.00',
          currency: 'EUR'
        }
      }
    ],
    merchant: {
      redirectConfirmUrl: 'https://staging.portal.scalapay.com/success-url',
      redirectCancelUrl: 'https://staging.portal.scalapay.com/failure-url'
    },
    merchantReference: 'merchantOrder-1234',
    taxAmount: {
      amount: '3.70',
      currency: 'EUR'
    },
    shippingAmount: {
      amount: '10.00',
      currency: 'EUR'
    },
    orderExpiryMilliseconds: 6000000
  });
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [];

  constructor(
    fuseTranslationLoaderService: FuseTranslationLoaderService,
    notifcationService: NotificationService
  ) {
    super(fuseTranslationLoaderService, notifcationService);
    // Set the defaults
    this.buildFields();
  }

  ngOnInit() {
    super.ngOnInit();
    console.log(this.order.totalAmount);
    console.log(this.order.toJSON());
  }

  buildFields() {
    this.fields = [
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-1',
            key: 'consumer.givenNames',
            type: 'input',
            templateOptions: {
              label: 'Given Name (required)',
              placeholder: 'Given Name',
              required: true
            }
          },
          {
            className: 'flex-3',
            key: 'consumer.surName',
            type: 'input',
            templateOptions: {
              label: 'Sur Name (required)',
              placeholder: 'Sur Name',
              required: true
            }
          }
        ]
      }
    ];
  }

  onSubmit() {
    console.log(this.order);
    console.log(this.order.toJSON());
  }
}
