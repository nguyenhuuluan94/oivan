import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ImageComponent } from './components/image/image.component';

@NgModule({
  declarations: [AlertComponent, LoadingComponent, ImageComponent],
  exports: [
    LoadingComponent,
    ImageComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule {
}
