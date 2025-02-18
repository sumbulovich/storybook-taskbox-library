import { Injectable, signal, WritableSignal } from '@angular/core';
import { Task } from '../models/task.model';
import { take, timer } from 'rxjs';

@Injectable()
export class TaskService {
  tasks: WritableSignal<Task[]> = signal([
    { id: '1', title: 'Something', state: 'TASK_INBOX' },
    { id: '2', title: 'Something more', state: 'TASK_INBOX' },
    { id: '3', title: 'Something else', state: 'TASK_INBOX' },
    { id: '4', title: 'Something again', state: 'TASK_INBOX' },
  ]);
  error: boolean = false;
  isLoading: boolean = true;

  pinTask(id: string) {
    this.tasks.update((tasks: Task[]) => {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        task.state = task.state === 'TASK_INBOX' ? 'TASK_PINNED' : 'TASK_INBOX';
      }
      return [...tasks];
    });
  }

  archiveTask(id: string) {
    this.tasks.update((tasks: Task[]) => {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        task.state = 'TASK_ARCHIVED';
      }
      return [...tasks];
    });
  }

  setAppError() {
    this.error = true;
  }
}
