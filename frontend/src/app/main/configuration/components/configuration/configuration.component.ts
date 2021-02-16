import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { NotificationService } from '../../../../core/services/notification.service';
import { BaseComponent } from '../../../../shared/base-component/base-component.component';
import { locale as english } from './../../i18n/en';
import { ConfigurationService } from './../../services/configuration.service';
import { Observable } from 'rxjs/internal/Observable';
import { ConfigurationModel } from '../../../../shared/models/configuration.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent extends BaseComponent implements OnInit {
  configuration: ConfigurationModel = new ConfigurationModel();
  /**
   * Constructor
   *
   * @param {FuseTranslationLoaderService} fuseTranslationLoaderService
   * @param {NotificationService} notificationService
   * @param {ConfigurationService} configurationService
   */
  constructor(
    fuseTranslationLoaderService: FuseTranslationLoaderService,
    notificationService: NotificationService,
    private configurationService: ConfigurationService
  ) {
    super(fuseTranslationLoaderService, notificationService);
    this.fuseTranslationLoaderService.loadTranslations(english);
  }

  ngOnInit() {
    this.configurationService
      .getConfiguration()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => (this.configuration = data));
  }
}
