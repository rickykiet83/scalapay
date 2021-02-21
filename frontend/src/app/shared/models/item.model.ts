import { Amount, AmountModel } from './amount.model';
import { EntityModel } from './entity.model';

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

export class ItemModel extends EntityModel<Item> implements Item {
  name: string;
  category: string;
  subcategory: string[];
  brand: string;
  gtin: string;
  sku: string;
  quantity: number;
  private _price: Amount;

  constructor(data?: Item) {
    super();
    this.fromJSON(data);
  }

  fromJSON(data?: Item): ItemModel {
    if (!data) return this;

    this.name = data.name;
    this.category = data.category;
    this.subcategory = data.subcategory;
    this.brand = data.brand;
    this.gtin = data.gtin;
    this.sku = data.sku;
    this.quantity = data.quantity | 1;
    this._price = data.price;

    return this;
  }

  get total(): AmountModel {
      const amount =  this.quantity * +this.price.amount;
      return new AmountModel({amount});
  }

  get price(): AmountModel {
      return new AmountModel({amount: this._price.amount});
  }

  toJSON(): Item {
      return {
        name: this.name,
        category: this.category,
        subcategory: this.subcategory,
        brand: this.brand,
        gtin: this.gtin,
        sku: this.sku,
        quantity: this.quantity | 1,
        price: this.price,
      }
  }
}
