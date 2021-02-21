const request = require('supertest');
let server = require('./../../app');
let configObject = {};

describe('/api/configurations', () => {
  // loading the server
  beforeEach(() => {
    server = require('./../../app');
    configObject = {
      "type": "PAY_BY_INSTALLMENT",
      "description": "'Pay over time'",
      "minimumAmount": {
        "amount": "4.00",
        "currency": "EUR"
      },
      "maximumAmount": {
        "amount": "600.00",
        "currency": "EUR"
      },
      "numberOfPayments": 3,
      "promotionUrl": "https://promotion.scalapay.it/popup/600/",
      "locales": [
        "en",
        "fr",
        "it"
      ]
    };
  });

  afterEach(async () => {
    configObject = {};
});

  describe('GET /', () => {
    it('should return a configuration object', async () => {
      const res = await request(server).get('/api/configurations');
      
      expect(res.body).toMatchObject(configObject);
    });
    it('should return status 200', async () => {
      const res = await request(server).get('/api/configurations');
      
      expect(res.status).toBe(200);
    });
    it('should return an object with key,value: type:PAY_BY_INSTALLMENT', async () => {
      const res = await request(server).get('/api/configurations');
      
      expect(res.body).toHaveProperty('type', 'PAY_BY_INSTALLMENT');
    });
  });
});