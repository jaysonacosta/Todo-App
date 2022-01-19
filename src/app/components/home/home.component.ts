import { Component, OnInit } from '@angular/core';
import { ApiGroupService, Group } from 'src/app/services/api-group.service';
import { ApiTaskService, Task } from 'src/app/services/api-task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  groups: Group[] = [];
  tasks: Task[] = [];
  constructor(
    private apiGroupService: ApiGroupService,
    private apiTaskService: ApiTaskService
  ) {}

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups(): void {
    this.groups = [];
    this.apiGroupService.getAllGroups().subscribe((data: Group[]) => {
      for (const entry of data) {
        const group: Group = {
          _id: entry._id,
          title: entry.title,
          meta: {
            pinned: entry.meta.pinned,
          },
          createdAt: entry.createdAt,
          selected: false,
        };
        this.groups?.push(group);
      }
    });
  }

  getGroupTasks(groupId: string): void {
    this.tasks = [];
    this.apiTaskService.getGroupTasks(groupId).subscribe((data: Task[]) => {
      for (const entry of data) {
        const task: Task = {
          _id: entry._id,
          title: entry.title,
          meta: {
            completed: entry.meta.completed,
            priority: entry.meta.priority,
          },
          _groupId: entry._groupId,
          createdAt: entry.createdAt,
        };
        this.tasks?.push(task);
      }
    });
  }
}
