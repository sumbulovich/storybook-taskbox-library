import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskComponent } from '../task/task.component';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'sumbul-task-list',
  imports: [TaskComponent, NgIf, NgForOf],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  standalone: true
})
export class TaskListComponent {
  /**
   * @ignore
   * Component property to define ordering of tasks
   */
  tasksInOrder: Task[] = [];

  /** Checks if it's in loading state */
  @Input() loading = false;

  /** Event to change the task to pinned */
  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onPinTask = new EventEmitter<Event>();

  /** Event to change the task to archived */
  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onArchiveTask = new EventEmitter<Event>();

  @Input()
  set tasks(arr: Task[]) {
    const initialTasks = [
      ...arr.filter((t) => t.state === 'TASK_PINNED'),
      ...arr.filter((t) => t.state !== 'TASK_PINNED'),
    ];
    this.tasksInOrder = initialTasks.filter(
      (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
    );
  }
}
