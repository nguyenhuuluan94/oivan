import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() src: string;
  defaultImage = 'https://image.flaticon.com/icons/png/512/1548/1548682.png';

  constructor() { }

  ngOnInit(): void {
  }

}
