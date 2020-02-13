import { Component, OnInit } from '@angular/core';
import { ConsoleService } from '../../../../core/services/console/console.service';
import { Console } from '../../../../shared/models/console.model';

@Component({
  selector: 'app-consoles',
  templateUrl: './consoles.component.html',
  styleUrls: ['./consoles.component.css']
})
export class ConsolesComponent implements OnInit {

  consoles: Console[];

  constructor(private consoleService: ConsoleService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.consoleService.findAll().subscribe(consoles => this.consoles = consoles);
  }

}
