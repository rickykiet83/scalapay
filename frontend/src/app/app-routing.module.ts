import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
      path: 'auth',
      loadChildren: () => import('./main/authentication/authentication.module').then(m => m.AuthenticationModule),
  },
  {
    path: '**',
    redirectTo: 'configurations'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
