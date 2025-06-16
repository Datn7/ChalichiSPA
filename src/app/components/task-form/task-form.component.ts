import { Component, EventEmitter, Output } from '@angular/core';
import { TaskItem } from '../../models/task.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  @Output() taskCreated = new EventEmitter<TaskItem>();
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      deadline: [''],
      priority: ['Medium', Validators.required],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = {
        ...this.taskForm.getRawValue(),
        isComplete: false, // Ensure task meets model requirements
      };

      this.taskService.createTask(taskData).subscribe((newTask) => {
        this.taskCreated.emit(newTask);
        this.taskForm.reset({ priority: 'Medium' });
      });
    }
  }
}
