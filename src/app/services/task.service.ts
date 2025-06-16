import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskItem } from '../models/task.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'https://localhost:5052/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl);
  }

  createTask(task: Omit<TaskItem, 'id'>): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.apiUrl, task);
  }

  completeTask(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, { isComplete: true });
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
