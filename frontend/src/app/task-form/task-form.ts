import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../app/service/task';
import { TaskModel } from '../dashboard/dashboard'; // adjust path to where TaskModel is


@Component({
 selector: 'app-task-form',
 standalone: true,
 imports: [FormsModule],
 templateUrl: './task-form.html',
})
export class TaskForm {
 @Input() task: TaskModel | null = null;

 @Output() close = new EventEmitter<void>();
 @Output() refresh = new EventEmitter<void>();

 form: TaskModel = {
   title: '',
   description: '',
   dueDate: '',
   status: 'TODO',
 };

 constructor(private taskService: Task) {}

 ngOnInit() {
   if (this.task) {
     // clone input into the form
     this.form = { ...this.task };
   }
 }

 save() {
   // Basic client-side validation (optional)
   if (!this.form.title?.trim()) return;

   if (this.task?.id) {
     // UPDATE
     this.taskService.updateTask(this.task.id, this.form).subscribe({
       next: () => {
         this.refresh.emit();
         this.close.emit();
       },
       error: (err) => console.error('Failed to update task', err),
     });
   } else {
     // CREATE
     const payload: TaskModel = { ...this.form };
     console.log(payload);
     
     this.taskService.createTask(payload).subscribe({
       next: () => {
         this.refresh.emit();
         this.close.emit();
       },
       error: (err) => console.error('Failed to create task', err),
     });
   }
 }
}

