import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css',
})
export class LazyImageComponent implements OnInit {
  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  public hasBeenLoaded: boolean = false;

  ngOnInit(): void {
    if (!this.url) throw new Error('No url provided');
  }

  onLoad() {
    setTimeout(() => {
      this.hasBeenLoaded = true;
    }, 1000);
  }
}
