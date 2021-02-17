import { EntityModel } from './entity.model';
export interface TotalAmount {
  amount: string;
  currency: string;
}

export interface Consumer {
  phoneNumber: string;
  givenNames: string;
  surname: string;
  email: string;
}

export interface Billing {
  name: string;
  line1: string;
  suburb: string;
  postcode: string;
  countryCode: string;
  phoneNumber: string;
}

export interface Shipping {
  name: string;
  line1: string;
  suburb: string;
  postcode: string;
  countryCode: string;
  phoneNumber: string;
}

export interface Price {
  amount: string;
  currency: string;
}

export interface Item {
  name: string;
  category: string;
  subcategory: string[];
  brand: string;
  gtin: string;
  sku: string;
  quantity: number;
  price: Price;
}

export interface Amount {
  amount: string;
  currency: string;
}

export interface Discount {
  displayName: string;
  amount: Amount;
}

export interface Merchant {
  redirectConfirmUrl: string;
  redirectCancelUrl: string;
}

export interface TaxAmount {
  amount: string;
  currency: string;
}

export interface ShippingAmount {
  amount: string;
  currency: string;
}

export interface Order {
  totalAmount: TotalAmount;
  consumer: Consumer;
  billing: Billing;
  shipping: Shipping;
  items: Item[];
  discounts: Discount[];
  merchant: Merchant;
  merchantReference: string;
  taxAmount: TaxAmount;
  shippingAmount: ShippingAmount;
  orderExpiryMilliseconds: number;
}

export class OrderModel extends EntityModel<OrderModel> implements Order {
  totalAmount: TotalAmount;
  consumer: Consumer;
  billing: Billing;
  shipping: Shipping;
  items: Item[];
  discounts: Discount[];
  merchant: Merchant;
  merchantReference: string;
  taxAmount: TaxAmount;
  shippingAmount: ShippingAmount;
  orderExpiryMilliseconds: number;

  constructor(data?: Order) {
      super()
      this.fromJSON(data);
  }

  fromJSON(data?: Order): OrderModel {
    if (!data) return this;

    this.totalAmount = data.totalAmount;
    this.consumer = data.consumer;
    this.billing = data.billing;
    this.shipping = data.shipping;
    this.items = data.items;
    this.discounts = data.discounts;
    this.merchant = data.merchant;
    this.merchantReference = data.merchantReference;
    this.taxAmount = data.taxAmount;
    this.shippingAmount = data.shippingAmount;
    this.orderExpiryMilliseconds = data.orderExpiryMilliseconds || 6000000;

    return this;
  }

  toJSON(): Partial<Order> {
    return {
      totalAmount: this.totalAmount,
      consumer: this.consumer,
      billing: this.billing,
      shipping: this.shipping,
      items: this.items,
      discounts: this.discounts,
      merchant: this.merchant,
      merchantReference: this.merchantReference,
      taxAmount: this.taxAmount,
      shippingAmount: this.shippingAmount,
      orderExpiryMilliseconds: this.orderExpiryMilliseconds
    };
  }
}
