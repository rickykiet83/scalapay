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
        },
        total: 10
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
        },
        total: 20
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
  consumerFields: FormlyFieldConfig[] = [];
  shippingFields: FormlyFieldConfig[] = [];
  billingFields: FormlyFieldConfig[] = [];

  constructor(
    fuseTranslationLoaderService: FuseTranslationLoaderService,
    notifcationService: NotificationService
  ) {
    super(fuseTranslationLoaderService, notifcationService);
    // Set the defaults
    this.buildConsumerFields();
    this.buildShippingFields();
    this.buildBillingFields();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  buildConsumerFields() {
    this.consumerFields = [
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
            key: 'consumer.surname',
            type: 'input',
            templateOptions: {
              label: 'Sur Name (required)',
              placeholder: 'Sur Name',
              required: true
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-1',
            key: 'consumer.email',
            type: 'input',
            templateOptions: {
              type: 'email',
              pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              label: 'Given Name (required)',
              placeholder: 'Given Name',
              required: true
            }
          },
          {
            className: 'flex-1',
            key: 'consumer.phoneNumber',
            type: 'input',
            templateOptions: {
              label: 'Phone Number',
              placeholder: 'Phone Number',
              required: false
            }
          }
        ]
      }
    ];
  }

  buildShippingFields() {
    this.shippingFields = [
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-6',
            key: 'shipping.name',
            type: 'input',
            templateOptions: {
              label: 'Name (required)',
              placeholder: 'Name',
              required: true
            }
          },
          {
            className: 'flex-6',
            key: 'shipping.phoneNumber',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: 'Phone Number (required)',
              placeholder: 'Phone number',
              required: true
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-2',
            type: 'input',
            key: 'shipping.line1',
            templateOptions: {
              label: 'Street (required)',
              required: true
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'shipping.suburb',
            templateOptions: {
              label: 'Suburb (required)',
              required: true
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'shipping.postcode',
            templateOptions: {
              type: 'number',
              label: 'Post Code',
              max: 99999,
              min: 0,
              pattern: '\\d{5}'
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'shipping.countryCode',
            templateOptions: {
              label: 'Country Code (required)',
              required: true,
              maxLength: 2
            }
          },
        ]
      }
    ];
  }
  buildBillingFields() {
    this.billingFields = [
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-6',
            key: 'billing.name',
            type: 'input',
            templateOptions: {
              label: 'Name (required)',
              placeholder: 'Name',
              required: true
            }
          },
          {
            className: 'flex-6',
            key: 'billing.phoneNumber',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: 'Phone Number (required)',
              placeholder: 'Phone number',
              required: true
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-2',
            type: 'input',
            key: 'billing.line1',
            templateOptions: {
              label: 'Street (required)',
              required: true,
              maxLength: 250,
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'billing.suburb',
            templateOptions: {
              label: 'Suburb (required)',
              required: true
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'billing.postcode',
            templateOptions: {
              type: 'number',
              label: 'Post Code',
              max: 99999,
              min: 0,
              pattern: '\\d{5}'
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'billing.countryCode',
            templateOptions: {
              label: 'Country Code (required)',
              required: true,
              maxLength: 2
            }
          },
        ]
      }
    ];
  }

  onCopyAddressFrom(fromKey: string = 'billing', toKey: string = 'shipping') {
    this.form.get(`${toKey}.name`).setValue(this.form.get(`${fromKey}.name`).value);
    this.form.get(`${toKey}.line1`).setValue(this.form.get(`${fromKey}.line1`).value);
    this.form.get(`${toKey}.postcode`).setValue(this.form.get(`${fromKey}.postcode`).value);
    this.form.get(`${toKey}.suburb`).setValue(this.form.get(`${fromKey}.suburb`).value);
    this.form.get(`${toKey}.phoneNumber`).setValue(this.form.get(`${fromKey}.phoneNumber`).value);
    this.form.get(`${toKey}.countryCode`).setValue(this.form.get(`${fromKey}.countryCode`).value);
  }

  get disabledSave(): boolean {
      return this.form.invalid 
    //   || this.form.pristine
      ;
  }

  onSubmit() {
    console.log(this.order);
    console.log(this.order.toJSON());
  }
}
