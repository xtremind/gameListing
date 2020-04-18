import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chart-fragment',
  templateUrl: './chart-fragment.component.html',
  styleUrls: ['./chart-fragment.component.css']
})
export class ChartFragmentComponent implements OnInit {

  @Input() rawData;
  hostElement; // Native element hosting the SVG container

  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnInit(): void {
}
