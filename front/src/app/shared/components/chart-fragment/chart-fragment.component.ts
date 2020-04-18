import { Component,  Input } from '@angular/core';

import * as FusionCharts from 'fusioncharts';

const dataUrl = 'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json';
const schemaUrl = 'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json';

@Component({
  selector: 'app-chart-fragment',
  templateUrl: './chart-fragment.component.html',
  styleUrls: ['./chart-fragment.component.css']
})
export class ChartFragmentComponent {

  @Input() rawData;

  dataSource: any;
  type: string;
  width: string;
  height: string;
  constructor() {
    this.type = 'timeseries';
    this.width = '100%';
    this.height = '400';
    this.dataSource = {
      data: null,
      yAxis: {
        plot: [{ value: 'Sales' }]
      },
      caption: {
        text: 'Online Sales of a SuperStore in the US'
      }
    };
    this.fetchData();
  }
  fetchData() {
    let jsonify = res => res.json();
    let dataFetch = fetch(dataUrl).then(jsonify);
    let schemaFetch = fetch(schemaUrl).then(jsonify);
    Promise.all([dataFetch, schemaFetch]).then(res => {
      let data = res[0];
      let schema = res[1];
      let fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      ); // Instance of DataTable to be passed as data in dataSource
      this.dataSource.data = fusionTable;
    });
  }

}
