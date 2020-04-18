import { Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';

import * as CanvasJS from '../../../../assets/canvasjs.min';


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
    const datas = [];
    const datas2 = [];
    let value = 0;
    for ( let i = 0; i < 10000; i++ ) {
      value += Math.round(5 + Math.random() * (-5 - 5));
      datas.push({y: value});
    }
    for ( let i = 0; i < 10000; i++ ) {
      value += Math.round(5 + Math.random() * (-5 - 5));
      datas2.push({y: value});
    }
    const chart = new CanvasJS.Chart('chartContainer', {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Performance Demo - 10000 DataPoints'
      },
      subtitles:[{
        text: 'Try Zooming and Panning'
      }],
      data: [{
        type: 'line',
        name: "datas",
        dataPoints: datas
      },
      {
        type: 'line',
        name: "datas2",
        dataPoints: datas2
      }]
    });

    chart.render();
  }
}
