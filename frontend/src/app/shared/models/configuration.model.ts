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
