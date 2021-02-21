import { NotificationService } from './../../../../core/services/notification.service';
import { ProductsService } from './../../services/products.service';
import { BaseComponent } from './../../../../shared/base-component/base-component.component';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

@Component({
  selector: 'e-commerce-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent extends BaseComponent implements OnInit {
  dataSource: FilesDataSource | null;
  displayedColumns = ['id', 'image', 'name', 'category', 'price', 'quantity', 'active'];

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  @ViewChild('filter', { static: true })
  filter: ElementRef;

  constructor(
    fuseTranslationLoaderService: FuseTranslationLoaderService,
    notificationService: NotificationService,
    private productService: ProductsService
  ) {
    super(fuseTranslationLoaderService, notificationService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.dataSource = new FilesDataSource(this.productService, this.paginator, this.sort);

    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(takeUntil(this._unsubscribeAll), debounceTime(150), distinctUntilChanged())
      .subscribe((value) => {
        if (!this.dataSource) {
          return;
        }

        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class FilesDataSource extends DataSource<any> {
  private _filterChange = new BehaviorSubject('');
  private _filteredDataChange = new BehaviorSubject('');

  /**
   * Constructor
   *
   * @param {EcommerceProductsService} productsService
   * @param {MatPaginator} matPaginator
   * @param {MatSort} matSort
   */
  constructor(
    private productsService: ProductsService,
    private matPaginator: MatPaginator,
    private matSort: MatSort
  ) {
    super();

    this.filteredData = this.productsService.products;
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   *
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
    const displayDataChanges = [
      this.productsService.onProductsChanged,
      this.matPaginator.page,
      this._filterChange,
      this.matSort.sortChange
    ];

    return merge(...displayDataChanges).pipe(
      map(() => {
        let data = this.productsService.products.slice();

        data = this.filterData(data);

        this.filteredData = [...data];

        data = this.sortData(data);

        // Grab the page's slice of data.
        const startIndex = this.matPaginator.pageIndex * this.matPaginator.pageSize;
        return data.splice(startIndex, this.matPaginator.pageSize);
      })
    );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  // Filtered data
  get filteredData(): any {
    return this._filteredDataChange.value;
  }

  set filteredData(value: any) {
    this._filteredDataChange.next(value);
  }

  // Filter
  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Filter data
   *
   * @param data
   * @returns {any}
   */
  filterData(data): any {
    if (!this.filter) {
      return data;
    }
    return FuseUtils.filterArrayByString(data, this.filter);
  }

  /**
   * Sort data
   *
   * @param data
   * @returns {any[]}
   */
  sortData(data): any[] {
    if (!this.matSort.active || this.matSort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this.matSort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case 'categories':
          [propertyA, propertyB] = [a.categories[0], b.categories[0]];
          break;
        case 'price':
          [propertyA, propertyB] = [a.priceTaxIncl, b.priceTaxIncl];
          break;
        case 'quantity':
          [propertyA, propertyB] = [a.quantity, b.quantity];
          break;
        case 'active':
          [propertyA, propertyB] = [a.active, b.active];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this.matSort.direction === 'asc' ? 1 : -1);
    });
  }

  /**
   * Disconnect
   */
  disconnect(): void {}
}
