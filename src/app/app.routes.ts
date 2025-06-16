import { Routes } from '@angular/router';
import { LoginC } from './auth/login/login.c';
import { RegisterC } from '../app/auth/register/register.c';
import { AuthGuard } from './guards/auth-guard';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginC },
  { path: 'register', component: RegisterC },
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
];
