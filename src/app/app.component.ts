import { Component } from '@angular/core';
import { LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }]
})
export class AppComponent  {
  public constructor(private titleService: Title) {
    titleService.setTitle('OIVAN - Create and operate human-centric digital services');
  }
}
