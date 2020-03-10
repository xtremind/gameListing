import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConsoleService } from '../../../../core/services/console/console.service';

import { Console } from '../../../../shared/models/console.model';

@Component({
  selector: 'app-console-detail',
  templateUrl: './console-detail.component.html',
  styleUrls: ['./console-detail.component.css']
})
export class ConsoleDetailComponent implements OnInit {

  console: Console;

  constructor(
    private route: ActivatedRoute,
    private consoleService: ConsoleService) { }

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.consoleService.find(id).subscribe(console => this.console = console);
  }
}
