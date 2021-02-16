import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { LocalStorageService } from './local-storage/local-storage.service';
import { MaterialModule } from './material.module';
import { NotificationService } from './services/notification.service';

@NgModule({
  declarations: [],
  imports: [FuseSharedModule, MaterialModule, TranslateModule.forRoot()],
  providers: [LocalStorageService, NotificationService],
  exports: [TranslateModule, FuseSharedModule, MaterialModule]
})
export class CoreModule {}
