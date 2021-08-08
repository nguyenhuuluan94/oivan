import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {
  public constructor(private titleService: Title) {
    titleService.setTitle('OIVAN - Create and operate human-centric digital services');
  }
}
