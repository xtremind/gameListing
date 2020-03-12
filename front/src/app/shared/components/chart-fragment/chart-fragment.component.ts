import { Component, OnInit, Input } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-chart-fragment',
  templateUrl: './chart-fragment.component.html',
  styleUrls: ['./chart-fragment.component.css']
})
export class ChartFragmentComponent implements OnInit {

  @Input() rawData;


  constructor() {
    
  }

  ngOnInit(): void {
  }

}
