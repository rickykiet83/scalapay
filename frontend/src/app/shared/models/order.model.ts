import { EntityModel } from './entity.model';

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

export interface Item {
  name: string;
  category: string;
  subcategory: string[];
  brand: string;
  gtin: string;
  sku: string;
  quantity: number;
  price: Amount;
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

export interface TaxAmount extends Amount {}

export interface ShippingAmount extends Amount {}

export interface Order {
  subtotal?: Amount;
  totalAmount: Amount;
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
  date: string = new Date().toLocaleDateString();  
  totalAmount: Amount;
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
  private _subtotal: Amount;

  constructor(data?: Order) {
    super();
    this.fromJSON(data);
  }

  fromJSON(data?: Order): OrderModel {
    if (!data) return this;

    this._subtotal = data.subtotal;
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

  get subtotal(): Amount {
      const _amount = this.items.reduce((amount, item) => amount + (item.quantity * +item.price.amount), 0);
      return {
          amount: _amount.toString(),
          currency: 'EUR'
      }
  }

  get billingAddress(): string {
      return `${this.billing.line1}, ${this.billing.suburb}, ${this.billing.postcode}, ${this.billing.countryCode}`;
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
