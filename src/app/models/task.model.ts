export interface TaskItem {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  deadline?: string;
  priority: 'Low' | 'Medium' | 'High';
}
