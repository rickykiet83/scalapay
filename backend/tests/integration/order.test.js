const request = require('supertest');
const config = require('config');
const { expectCt } = require('helmet');
let server;
let token;
let orderObject;

describe('/api/orders', () => {
  // loading the server
  beforeEach(() => {
    server = require('./../../app');
    token = config.get('token');
    orderObject = {
      "totalAmount": {
        "amount": "40.70",
        "currency": "EUR"
      },
      "consumer": {
        "phoneNumber": "0400000001",
        "givenNames": "Joe",
        "surname": "Consumer",
        "email": "test@scalapay.com"
      },
      "billing": {
        "name": "Joe Consumer",
        "line1": "Via della Rosa, 23",
        "suburb": "Montelupo Fiorentino",
        "postcode": "50056",
        "countryCode": "IT",
        "phoneNumber": "0400000000"
      },
      "shipping": {
        "name": "Joe Consumer",
        "line1": "Via della Rosa, 23",
        "suburb": "Montelupo Fiorentino",
        "postcode": "50056",
        "countryCode": "IT",
        "phoneNumber": "0400000000"
      },
      "items": [{
          "name": "T-Shirt",
          "category": "clothes",
          "subcategory": [
            "shirt",
            "long-sleeve"
          ],
          "brand": "TopChoice",
          "gtin": "123458791330",
          "sku": "12341234",
          "quantity": 1,
          "price": {
            "amount": "10.00",
            "currency": "EUR"
          }
        },
        {
          "name": "Jeans",
          "category": "clothes",
          "subcategory": [
            "pants",
            "jeans"
          ],
          "brand": "TopChoice",
          "gtin": "123458722222",
          "sku": "12341235",
          "quantity": 1,
          "price": {
            "amount": "20.00",
            "currency": "EUR"
          }
        }
      ],
      "discounts": [{
        "displayName": "10% Off",
        "amount": {
          "amount": "3.00",
          "currency": "EUR"
        }
      }],
      "merchant": {
        "redirectConfirmUrl": "https://staging.portal.scalapay.com/success-url",
        "redirectCancelUrl": "https://staging.portal.scalapay.com/failure-url"
      },
      "merchantReference": "merchantOrder-1234",
      "taxAmount": {
        "amount": "3.70",
        "currency": "EUR"
      },
      "shippingAmount": {
        "amount": "10.00",
        "currency": "EUR"
      },
      "orderExpiryMilliseconds": 6000000
    }
  });

  afterEach(() => {
    token = null;
    orderObject = null;
  });
  describe('POST /', () => {

    const exec = async () => {
      return await request(server)
        .post('/api/orders')
        .send(orderObject)
    };
    it('should return 200 if is is valid', async () => {
      const res = await exec();
      
      expect(res.status).toBe(200);
    });
    it('should return token if is is valid', async () => {
      const res = await exec();
      
      expect(res.body).toHaveProperty('token');
    });
    it('should return expires if is is valid', async () => {
      const res = await exec();
      
      expect(res.body).toHaveProperty('expires');
    });
    it('should return checkoutUrl if is is valid', async () => {
      const res = await exec();
      
      expect(res.body).toHaveProperty('checkoutUrl');
    });

    it('should return 400 if totalAmount.amount is null or empty', async () => {
      orderObject.totalAmount.amount = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if totalAmount.amount <= 0', async () => {
      orderObject.totalAmount.amount = -10;
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if totalAmount.currency is null or empty', async () => {
      orderObject.totalAmount.currency = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if maxLength(totalAmount.currency) > 5', async () => {
      orderObject.totalAmount.currency = "123456";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if consumer.givenNames is null or empty', async () => {
      orderObject.consumer.givenNames = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    
    it('should return 400 if consumer.surname is null or empty', async () => {
      orderObject.consumer.surname = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if consumer.email is null or empty', async () => {
      orderObject.consumer.email = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if consumer.email is invalid', async () => {
      orderObject.consumer.email = "test@scalapay";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should contain message:must be a valid email if consumer.email is invalid', async () => {
      orderObject.consumer.email = "test@scalapay";
      const res = await exec();
      expect(res.text).toContain('must be a valid email');
    });
    it('should return 400 if merchant/redirectConfirmUrl is null or empty', async () => {
      orderObject.merchant.redirectConfirmUrl = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if merchant/redirectCancelUrl is null or empty', async () => {
      orderObject.merchant.redirectCancelUrl = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if shipping is null or empty', async () => {
      orderObject.shipping = {};
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if shipping.name is null or empty', async () => {
      orderObject.shipping.name = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if shipping.line1 is null or empty', async () => {
      orderObject.shipping.line1 = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if shipping.suburb is null or empty', async () => {
      orderObject.shipping.suburb = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if shipping.postcode is null or empty', async () => {
      orderObject.shipping.postcode = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if shipping.countryCode is null or empty', async () => {
      orderObject.shipping.countryCode = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if shipping.phoneNumber is null or empty', async () => {
      orderObject.shipping.phoneNumber = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if maxLength(shipping.phoneNumber) > 15', async () => {
      orderObject.shipping.phoneNumber = new Array(16).join('a');
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if merchantReference is null or empty', async () => {
      orderObject.merchantReference = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if items is null or empty', async () => {
      orderObject.items = [];
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if items[0].name is null or empty', async () => {
      orderObject.items[0].name = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if maxLength(items[0].name) > 250 ', async () => {
      orderObject.items[0].name = new Array(252).join('a');
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if items[0].category is null or empty', async () => {
      orderObject.items[0].category = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if items[0].subcategory is null or empty', async () => {
      orderObject.items[0].subcategory = [];
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if items[0].brand is null or empty', async () => {
      orderObject.items[0].brand = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if items[0].gtin is null or empty', async () => {
      orderObject.items[0].gtin = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if items[0].sku is null or empty', async () => {
      orderObject.items[0].sku = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if items[0].quantity is null or empty', async () => {
      orderObject.items[0].quantity = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if items[0].quantity <= 0', async () => {
      orderObject.items[0].quantity = 0;
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if items[0].price is null or empty', async () => {
      orderObject.items[0].price = {};
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if items[0].price.amount is null or empty', async () => {
      orderObject.items[0].price.amount = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if items[0].price.amount <= 0', async () => {
      orderObject.items[0].price.amount = -10;
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if items[0].price.currency is null or empty', async () => {
      orderObject.items[0].price.currency = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return 400 if maxLength(items[0].price.currency) > 5', async () => {
      orderObject.items[0].price.currency = "123456";
      const res = await exec();
      expect(res.status).toBe(400);
    });
  });

});