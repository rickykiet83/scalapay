import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { NotificationService } from '../../../../core/services/notification.service';
import { BaseComponent } from '../../../../shared/base-component/base-component.component';
import { locale as english } from './../../i18n/en';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent extends BaseComponent implements OnInit {
  /**
   * Constructor
   *
   * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
   */
  constructor(
    fuseTranslationLoaderService: FuseTranslationLoaderService,
    notificationService: NotificationService,
  ) {
    super(fuseTranslationLoaderService, notificationService);
    this.fuseTranslationLoaderService.loadTranslations(english);
  }

  ngOnInit() {
  }
}
