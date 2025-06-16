import { Component } from '@angular/core';
import { TaskItem } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  standalone: true,
  selector: 'app-task-list',
  imports: [CommonModule, ReactiveFormsModule, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  tasks: TaskItem[] = [];

  onTaskCreated(task: TaskItem) {
    this.tasks.push(task);
  }

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  markComplete(task: TaskItem) {
    this.taskService.completeTask(task.id).subscribe(() => {
      task.isComplete = true;
    });
  }

  deleteTask(task: TaskItem) {
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    });
  }
}
