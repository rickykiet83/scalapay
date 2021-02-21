import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ECommerceFakeDb } from 'app/fake-db/e-commerce';

export class FakeDbService implements InMemoryDbService {
  createDb(): any {
    return {
      // E-Commerce
      'e-commerce-products': ECommerceFakeDb.products
    };
  }
}
