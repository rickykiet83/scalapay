import { Amount, AmountModel } from './amount.model';

export interface Discount {
  displayName: string;
  amount: Amount;
}

export class DiscountModel implements Discount {
    displayName: string;
    private _amount: Amount;

    constructor(data?: Discount) {
        this.displayName = data.displayName;
        this._amount = data.amount;
    }

    get amount(): AmountModel {
        return new AmountModel(this._amount);
    }

}
