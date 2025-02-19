import { NgIf } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { TaskListComponent } from '../../../lib/molecules/task-list/task-list.component';
import { TaskService } from './task.service';
import { Task } from '../../../lib/models/task.model';

@Component({
  selector: 'sumbul-inbox-screen',
  imports: [TaskListComponent],
  templateUrl: './inbox-screen.component.html',
  styleUrl: './inbox-screen.component.scss',
  standalone: true
})
export class InboxScreenComponent {
  private taskService: TaskService = inject(TaskService)
  tasks: Task[] = [];
  error: boolean = this.taskService.error;

  constructor() {
    effect(() => {
      this.tasks = this.taskService.tasks()
    });
  }

  /**
   * Component method to trigger the archiveTask event
   */
  archiveTask(id: any) {
    this.taskService.archiveTask(id);
  }

  /**
   * Component method to trigger the pinTask event
   */
  pinTask(id: any) {
    this.taskService.pinTask(id);
  }
}
