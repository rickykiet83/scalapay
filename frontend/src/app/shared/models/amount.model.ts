import { formatNumber } from "@angular/common";

export interface Amount {
  amount: string | number;
  currency?: string;
}

export class AmountModel implements Amount {
    currency?: string = 'EUR';

    private _amount: string | number;
    constructor(data?: Amount) {
        this.fromJSON(data);
    }

    fromJSON(data?: Amount): AmountModel {
        if(!data) return this;

        this._amount = data.amount || 0;
        this.currency = data.currency || 'EUR';
    }

    get amount(): string | number {
        return formatNumber(+this._amount, 'en', '1.2-5');
    }
}


export interface TaxAmount extends Amount {}

export class TaxAmountModel extends AmountModel implements TaxAmount {}