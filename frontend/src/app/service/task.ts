import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskModel } from '../dashboard/dashboard'; // TODO: verify this path; typically models live under a /models folder
import Toastify from 'toastify-js';

@Injectable({ providedIn: 'root' })
export class Task {
  private readonly API = 'http://localhost:8080/api'; // base URL

  constructor(private http: HttpClient) { }

  /** Build Authorization header if token exists */
  private authHeaders(): HttpHeaders | undefined {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
  }

  // GET ALL TASKS
  getTasks(): Observable<TaskModel[]> {
    const headers = this.authHeaders();
    return this.http.get<TaskModel[]>(`${this.API}/tasks`, { headers });
  }

  // CREATE TASK
  createTask(data: TaskModel): Observable<TaskModel> {
    const headers = this.authHeaders();
    Toastify({
      text: "Task Created Successfully 🎉",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#28a745",
    }).showToast();
    return this.http.post<TaskModel>(`${this.API}/tasks`, data, { headers });
  }

  // UPDATE TASK
  updateTask(id: number, data: TaskModel): Observable<TaskModel> {
    const headers = this.authHeaders();
    Toastify({
      text: "Task Update Successfully 🎉",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#28a745",
    }).showToast();
    return this.http.put<TaskModel>(`${this.API}/tasks/${id}`, data, { headers });
  }

  // DELETE TASK
  deleteTask(id: number): Observable<void> {
    const headers = this.authHeaders();
    Toastify({
      text: "Task Deleted Successfully 🎉",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#28a745",
    }).showToast();
    return this.http.delete<void>(`${this.API}/tasks/${id}`, { headers });
  }
}
