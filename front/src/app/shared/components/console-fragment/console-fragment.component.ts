import { Component, OnInit, Input } from '@angular/core';

import { Console } from '../../../shared/models/console.model';

@Component({
  selector: 'app-console-fragment',
  templateUrl: './console-fragment.component.html',
  styleUrls: ['./console-fragment.component.css']
})
export class ConsoleFragmentComponent implements OnInit {

  @Input() console: Console;

  constructor() { }

  ngOnInit(): void {
  }

}
