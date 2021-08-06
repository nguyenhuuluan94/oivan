import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
    declarations: [AlertComponent, LoadingComponent],
    exports: [
        LoadingComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
