import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { HotToastModule } from '@ngneat/hot-toast';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [
      FuseSharedModule, 
      MaterialModule,
      TranslateModule.forRoot(),
      HotToastModule.forRoot()
    ],
  exports: [TranslateModule, FuseSharedModule, MaterialModule]
})
export class CoreModule {}
