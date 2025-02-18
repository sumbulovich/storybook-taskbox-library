import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-inbox-screen',
  imports: [NgIf, TaskListComponent],
  templateUrl: './inbox-screen.component.html',
  styleUrl: './inbox-screen.component.scss',
  providers: [TaskService],
  standalone: true
})
export class InboxScreenComponent {
  private taskService: TaskService = inject(TaskService)
  tasks = this.taskService.tasks;
  error: boolean = this.taskService.error;

  /**
   * Component method to trigger the archiveTask event
   */
  archiveTask(id: string) {
    this.taskService.archiveTask(id);
  }

  /**
   * Component method to trigger the pinTask event
   */
  pinTask(id: string) {
    this.taskService.pinTask(id);
  }
}
