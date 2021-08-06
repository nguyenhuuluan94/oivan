import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';

const Providers = [
  MatDividerModule,
  MatProgressBarModule,
  MatDialogModule,
  ScrollingModule
]

@NgModule({
  imports: [Providers],
  exports: [Providers]
})
export class MaterialModule { }
