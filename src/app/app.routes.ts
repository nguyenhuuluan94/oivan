import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

