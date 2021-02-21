import { Amount, AmountModel, TaxAmount, TaxAmountModel } from './amount.model';
import { Discount, DiscountModel } from './discount.model';
import { EntityModel } from './entity.model';
import { Item, ItemModel } from './item.model';

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

export interface Merchant {
  redirectConfirmUrl: string;
  redirectCancelUrl: string;
}

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

export class OrderModel extends EntityModel<Order> implements Order {
  date: string = new Date().toLocaleDateString();
  consumer: Consumer;
  billing: Billing;
  shipping: Shipping;
  merchant: Merchant;
  merchantReference: string;
  shippingAmount: ShippingAmount;
  orderExpiryMilliseconds: number;
  private _subtotal: Amount;
  private _items: Item[];
  private _taxAmount: TaxAmount;
  private _discounts: Discount[];
  private _totalAmount: Amount;

  constructor(data?: Order) {
    super();
    this.fromJSON(data);
  }

  fromJSON(data?: Order): OrderModel {
    if (!data) return this;

    this._subtotal = data.subtotal;
    this._totalAmount = data.totalAmount;
    this.consumer = data.consumer;
    this.billing = data.billing;
    this.shipping = data.shipping;
    this._items = data.items || [];
    this._discounts = data.discounts;
    this.merchant = data.merchant;
    this.merchantReference = data.merchantReference;
    this._taxAmount = data.taxAmount;
    this.shippingAmount = data.shippingAmount;
    this.orderExpiryMilliseconds = data.orderExpiryMilliseconds || 6000000;

    return this;
  }

  get subtotal(): AmountModel {
    const amount = this._items.reduce(
      (amount, item) => amount + item.quantity * +item.price.amount,
      0
    );

    return new AmountModel({ amount });
  }

  get items(): ItemModel[] {
    return this._items.map((item) => new ItemModel(item));
  }

  get discounts(): DiscountModel[] {
    return this._discounts.map((d) => new DiscountModel(d));
  }

  get billingAddress(): string {
    return `${this.billing.line1}, ${this.billing.suburb}, ${this.billing.postcode}, ${this.billing.countryCode}`;
  }

  get taxAmount(): TaxAmountModel {
    return new TaxAmountModel(this._taxAmount);
  }

  get totalAmount(): AmountModel {
    const amount = +this.subtotal.amount + +this.taxAmount.amount;
    return new AmountModel({ amount });
  }

  toJSON(): Order {
    return {
      totalAmount: this._totalAmount,
      consumer: this.consumer,
      billing: this.billing,
      shipping: this.shipping,
      items: this._items,
      discounts: this._discounts,
      merchant: this.merchant,
      merchantReference: this.merchantReference,
      taxAmount: this._taxAmount,
      shippingAmount: this.shippingAmount,
      orderExpiryMilliseconds: this.orderExpiryMilliseconds
    };
  }
}
