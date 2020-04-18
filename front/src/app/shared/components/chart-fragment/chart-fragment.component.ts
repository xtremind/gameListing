import {
  Component,
  OnInit,
  Input,
  ElementRef
} from '@angular/core';

import * as d3 from 'd3';

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
      const timeConv = d3.utcParse('%d/%m/%Y');

      const data = {
          y: 'price',
          series: [{
              name: 'price1',
              values: [10, 12, 11, 15, 14]
          }, {
              name: 'price2',
              values: [15, 17, 18, 20, 19]
          }, {
              name: 'price3',
              values: [15, 17, 18, 20, 19]
          }],
          dates: [
              timeConv('01/03/2020'),
              timeConv('02/03/2020'),
              timeConv('03/03/2020'),
              timeConv('04/03/2020'),
              timeConv('05/03/2020')
          ]
        }, {
          id : 'price3',
          values: [
            {
              date: timeConv('01/03/2020'),
              price: 20
            },
            {
              date: timeConv('02/03/2020'),
              price: 22
            },
            {
              date: timeConv('03/03/2020'),
              price: 21
            },
            {
              date: timeConv('04/03/2020'),
              price: 25
            },
            {
              date: timeConv('05/03/2020'),
              price: 24
            }
          ]
        }];

    // returns the sliced dataset
    console.log('Slices', slices);
    // returns the first slice
    console.log('First slice', slices[0]);
    // returns the array in the first slice
    console.log('A array', slices[0].values);
    // returns the date of the first row in the first slice
    console.log('Date element', slices[0].values[0].date);
    // returns the array's length
    console.log('Array length', (slices[0].values).length);

    // ----------------------------SCALES----------------------------- //
    const xScale = d3.scaleTime().range([0, width]);
    const yScale = d3.scaleLinear().rangeRound([height, 0]);

    xScale.domain(d3.extent(slices[0].values, d => d.date));
    yScale.domain([(0), d3.max(slices, c => d3.max(c.values, d => d.price + 4))]);

    // -----------------------------AXES------------------------------ //
    const yaxis = d3.axisLeft(yScale)
      .ticks((slices[0].values).length);

    const xaxis = d3.axisBottom(xScale)
      .ticks(d3.timeDay.every(1))
      .tickFormat(d3.timeFormat('%b %d'));

    // ----------------------------LINES------------------------------ //
    const line = d3.line()
      .x( d => xScale(d.date as Date))
      .y( d => yScale(d.price as number))
      .curve(d3.curveMonotoneX); // to curve the lines

    let id = 0;
    const ids = ()  => 'line-' + id++;

    // ---------------------------TOOLTIP---------------------------- //
    const tooltip = d3.select(this.hostElement).append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute');

    // -------------------------2. DRAWING---------------------------- //
    // -----------------------------AXES------------------------------ //
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xaxis);

    svg.append('g')
        .attr('class', 'axis')
        .call(yaxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('dy', '.75em')
        .attr('y', 6)
        .style('text-anchor', 'end')
        .text('Prix');

    // ----------------------------LINES------------------------------ //
    const lines = svg.selectAll('lines')
      .data(slices)
      .enter()
      .append('g');

    lines.append('path')
      .attr('class', ids)
      //.attr('fill', 'none')
      .attr('stroke-width', 1.5)
      .attr('stroke', 'red')
      .attr('d', d => line(d.values));

    lines.append('text')
      .attr('class', 'serie_label')
      .datum(d => {
          return {
              id: d.id,
              value: d.values[d.values.length - 1]
          };
      })
      .attr('transform', d => {
          return 'translate(' + (xScale(d.value.date) + 10) +
              ',' + (yScale(d.value.price) + 5) + ')';
      })
      .attr('x', 5)
      .text(d => d.id);
      // ---------------------------POINTS----------------------------- //

    lines.selectAll('points')
      .data( d => d.values)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.price))
      .attr('r', 1)
      .attr('class', 'point')
      .style('opacity', 1);

      // ---------------------------EVENTS----------------------------- //
    lines.selectAll('circles')
      .data( d => d.values)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.price))
      .attr('r', 10)
      .style('opacity', 0)
      .on('mouseover', d => {
          tooltip.transition()
            .duration(200)
            .delay(30)
            .style('opacity', 1);
          tooltip.html(d.price.toString())
            .style('left', (d3.event.pageX + 25) + 'px')
            .style('top', (d3.event.pageY) + 'px');
          /*const selection = d3.select(this).raise();
            selection
            .transition()
            .delay(20)
            .duration(200)
            .attr('r', 6)
            .style('opacity', 1)
            .style('fill', '#ed3700');*/
      }).on('mouseout', d => {
          tooltip.transition()
            .duration(200)
            .style('opacity', 0);
          /*const selection = d3.select(this);
          selection
            .transition()
            .delay(20)
            .duration(200)
            .attr('r', 10)
            .style('opacity', 0);*/
          });
  }
}
