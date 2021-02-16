import { Component, OnDestroy, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Subject } from 'rxjs/internal/Subject';

import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.scss']
})
export class BaseComponent implements OnInit, OnDestroy {
  protected _unsubscribeAll: Subject<any> = new Subject();
  constructor(
      protected fuseTranslationLoaderService: FuseTranslationLoaderService,
      protected notifcationService: NotificationService,
      ) {}

  ngOnInit() {}

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    // console.log('Unsubscribe from all subscriptions');
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
