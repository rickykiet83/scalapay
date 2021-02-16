import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [FuseSharedModule, MaterialModule, TranslateModule.forRoot()],
  exports: [TranslateModule, FuseSharedModule, MaterialModule]
})
export class CoreModule {}
