import { Injectable, signal, WritableSignal } from '@angular/core';
import { Task } from '../../../lib/models/task.model';

@Injectable()
export class TaskService {
  tasks: WritableSignal<Task[]> = signal([]);
  error: boolean = false;

  loadTasks() {
    this.tasks.set([
      { id: '1', title: 'Task 1', state: 'TASK_INBOX' },
      { id: '2', title: 'Task 2', state: 'TASK_INBOX' },
      { id: '3', title: 'Task 3', state: 'TASK_INBOX' },
      { id: '4', title: 'Task 4', state: 'TASK_INBOX' },
    ]);
  }

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
