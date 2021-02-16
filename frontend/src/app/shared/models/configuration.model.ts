export interface Configuration {
  type: string;
  description: string;
  minimumAmount: {
    amount: string;
    currency: string;
  };
  maximumAmount: {
    amount: string;
    currency: string;
  };
  numberOfPayments: number;
  promotionUrl: string;
  locales: [string];
}

export class ConfigurationModel implements Configuration {
  type: string;
  description: string;
  minimumAmount: {
    amount: string;
    currency: string;
  };
  maximumAmount: {
    amount: string;
    currency: string;
  };
  numberOfPayments: number;
  promotionUrl: string;
  locales: [string];

  constructor(data?: Configuration) {
    this.fromJSON(data);
  }

  fromJSON(data?: Configuration): ConfigurationModel {
    if (!data) return this;

    this.type = data.type || '';
    this.description = data.description || '';
    this.minimumAmount = data.minimumAmount;
    this.maximumAmount = data.maximumAmount;
    this.numberOfPayments = data.numberOfPayments || 0;
    this.promotionUrl = data.promotionUrl || '';
    this.type = data.type || '';
    this.locales = data.locales || [''];

    return this;
  }
}
