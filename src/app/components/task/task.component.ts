import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/services/api-task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task!: Task;

  constructor() { }

  ngOnInit(): void {
  }

}
