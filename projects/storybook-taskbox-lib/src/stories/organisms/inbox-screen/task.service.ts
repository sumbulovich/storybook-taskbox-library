import { Injectable, signal, WritableSignal } from '@angular/core';
import { Task } from '../../../lib/models/task.model';

@Injectable()
export class TaskService {
  tasks: WritableSignal<Task[]> = signal([]);
  error: boolean = false;

  pinTask(id: any) {
    this.tasks.update((tasks: Task[]) => {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        task.state = task.state === 'TASK_INBOX' ? 'TASK_PINNED' : 'TASK_INBOX';
      }
      return [...tasks];
    });
  }

  archiveTask(id: any) {
    this.tasks.update((tasks: Task[]) => {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        task.state = 'TASK_ARCHIVED';
      }
      return [...tasks];
    });
  }
}
