import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { NotificationService } from '../../../../core/services/notification.service';
import { BaseComponent } from '../../../../shared/base-component/base-component.component';
import { ConfigurationService } from '../../services/configuration.service';
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
    private configurationService: ConfigurationService,
  ) {
    super(fuseTranslationLoaderService, notificationService);
    this.fuseTranslationLoaderService.loadTranslations(english);
  }

  ngOnInit() {
      this.configurationService.getConfiguration().subscribe(config => {
          console.log(config);
      });
  }
}
