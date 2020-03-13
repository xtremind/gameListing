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
      };

      const height = 600;
      const width = 800;
      const margin = ({
          top: 20,
          right: 20,
          bottom: 30,
          left: 30
      });

      const svg = d3.select(this.hostElement).select('svg')
          .attr('preserveAspectRatio', 'xMinYMin meet')
          .attr('viewBox', '0 0 width height')
          .style('overflow', 'visible');

      const x = d3.scaleUtc()
          .domain(d3.extent(data.dates))
          .range([margin.left, width - margin.right]);

      const y = d3.scaleLinear()
          .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
          .range([height - margin.bottom, margin.top]);

      const xAxis = g => g
          .attr('transform', `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

      const yAxis = g => g
          .attr('transform', `translate(${margin.left},0)`)
          .call(d3.axisLeft(y))
          .call(g => g.select('.domain').remove())
          .call(g => g.select('.tick:last-of-type text').clone()
              .attr('x', 3)
              .attr('text-anchor', 'start')
              .attr('font-weight', 'bold')
              .text(data.y));

      svg.append('g').call(xAxis);

      svg.append('g').call(yAxis);

      const path = svg.append('g')
          .attr('fill', 'none')
          .attr('stroke', 'steelblue')
          .attr('stroke-width', 1.5)
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .selectAll('path')
          .data(data.series)
          .join('path')
          .style('mix-blend-mode', 'multiply')
          //.attr('d', d => line(d.values));

      svg.call(hover, path);

      //return svg.node();

      function hover(svg, path) {
          if ('ontouchstart' in document) {
              svg
                  .style('-webkit-tap-highlight-color', 'transparent')
                  .on('touchmove', moved)
                  .on('touchstart', entered)
                  .on('touchend', left);
          } else {
              svg
                  .on('mousemove', moved)
                  .on('mouseenter', entered)
                  .on('mouseleave', left);
          }

          const dot = svg.append('g').attr('display', 'none');

          dot.append('circle').attr('r', 2.5);

          dot.append('text')
              .style('font', '10px sans-serif')
              .attr('text-anchor', 'middle')
              .attr('y', -8);

          function moved() {
              d3.event.preventDefault();
              const ym = y.invert(d3.event.layerY);
              const xm = x.invert(d3.event.layerX);
              const i1 = d3.bisectLeft(data.dates, xm, 1);
              const i0 = i1 - 1;
              const i = ((xm.getTime() - data.dates[i0].getTime()) > (data.dates[i1].getTime() - xm.getTime())) ? i1 : i0;
              const s = data.series.reduce((a, b) => Math.abs(a.values[i] - ym) < Math.abs(b.values[i] - ym) ? a : b);
              path.attr('stroke', d => d === s ? null : '#ddd').filter(d => d === s).raise();
              dot.attr('transform', `translate(${x(data.dates[i])},${y(s.values[i])})`);
              dot.select('text').text(s.name);
          }

          function entered() {
              path.style('mix-blend-mode', null).attr('stroke', '#ddd');
              dot.attr('display', null);
          }

          function left() {
              path.style('mix-blend-mode', 'multiply').attr('stroke', null);
              dot.attr('display', 'none');
          }
      }

      const line = d3.line()
          //.defined(d => !isNaN(d))
          .x((d, i) => x(data.dates[i]))
          //.y(d => y(d));
  }
}