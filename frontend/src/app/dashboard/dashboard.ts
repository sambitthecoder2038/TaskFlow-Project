import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgIf, NgFor, NgClass } from '@angular/common';

import { Auth } from '../service/auth';
import { Task } from '../service/task';
import { TaskForm } from '../task-form/task-form';
import { ChangeDetectorRef } from '@angular/core';
import Toastify from 'toastify-js';
// Optional: declare a type for better safety
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface TaskModel {
  id?: number;
  title: string;
  description: string;
  dueDate: string;   // ISO string or yyyy-MM-dd as used by your backend
  status: TaskStatus;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, NgClass, TaskForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  userName = 'User';

  // Backing data
  tasks: TaskModel[] = [];
  filteredTasks: TaskModel[] = [];

  // UI state
  showForm = false;
  selectedTask: TaskModel | null = null;

  private auth = inject(Auth);
  private router = inject(Router);
  private taskService = inject(Task);
  private chan = inject(ChangeDetectorRef);

  private Storage = localStorage;


  ngOnInit() {

    const name = localStorage.getItem('name');
    if (name) this.userName = name;

    this.loadTasks();
  }

  /** Load tasks from API and set current filter to ALL */
  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (res: any) => {
        // If your API returns { data: [...] }, adjust accordingly.
        // Assuming it returns an array of tasks directly:
        this.tasks = Array.isArray(res) ? res : (res?.data ?? []);
        this.filteredTasks = [...this.tasks];
        this.chan.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load tasks', err);
        this.tasks = [];
        this.filteredTasks = [];
      },
    });
  }

  /** Quick counts for cards */
  getCount(status: TaskStatus | 'ALL'): number {
    if (status === 'ALL') return this.tasks.length;
    return this.tasks.filter(t => t.status === status).length;
  }

  /** Filter bar action */
  filterTasks(status: TaskStatus | 'ALL') {
    if (status === 'ALL') {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(t => t.status === status);
    }
  }

  /** Open empty form for create */
  openForm() {
    this.selectedTask = null;
    this.showForm = true;
  }

  /** Open form with an existing task */
  editTask(t: TaskModel) {
    this.selectedTask = { ...t };
    this.showForm = true;
  }

  /** Close modal */
  closeForm() {
    this.showForm = false;
    this.selectedTask = null;
  }

  /** Delete a task by id and refresh */
  deleteTask(id?: number) {
    if (!id) return;
    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Failed to delete task', err),
    });
  }

  /** Logout and navigate to login */
  logout() {
    this.auth.logout();
    Toastify({
      text: "Logout Successful 🎉",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#28a745",
    }).showToast();
    this.router.navigate(['/login']);
  }
}
