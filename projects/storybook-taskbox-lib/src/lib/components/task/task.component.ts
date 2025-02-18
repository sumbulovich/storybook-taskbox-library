import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'sumbul-task',
  imports: [NgIf],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  standalone: true
})
export class TaskComponent {
  /**
   * The shape of the task object
  */
  @Input() task?: Task;

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onPinTask = new EventEmitter<Event>();

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onArchiveTask = new EventEmitter<Event>();

  /**
   * @ignore
   * Component method to trigger the onPin event
   * @param id string
   */
  onPin(id: any) {
    this.onPinTask.emit(id);
  }
  /**
   * @ignore
   * Component method to trigger the onArchive event
   * @param id string
   */
  onArchive(id: any) {
    this.onArchiveTask.emit(id);
  }
}
