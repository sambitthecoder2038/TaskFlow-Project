package com.taskflow.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskflow.entity.Task;
import com.taskflow.services.TaskService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200") // allow Angular
public class TaskController {

	private final TaskService taskService;

	// 🔹 GET ALL TASKS
	@GetMapping
	public ResponseEntity<List<Task>> getTasks(Authentication auth) {
		List<Task> tasks = taskService.getTasks(auth.getName());
		return ResponseEntity.ok(tasks);
	}

	// 🔹 CREATE TASK
	@PostMapping
	public ResponseEntity<Task> createTask(@RequestBody Task task, Authentication auth) {
		Task created = taskService.createTask(task, auth.getName());
		return ResponseEntity.ok(created);
	}

	// 🔹 UPDATE TASK
	@PutMapping("/{id}")
	public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody Task task, Authentication auth) {

		Task updated = taskService.updateTask(id, task, auth.getName());

		return ResponseEntity.ok(Map.of("message", "Task updated successfully", "task", updated));
	}

	// 🔹 DELETE TASK (IMPORTANT FIX)
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteTask(@PathVariable Long id, Authentication auth) {

		taskService.deleteTask(id, auth.getName());

		// ✅ return JSON instead of plain text
		return ResponseEntity.ok(Map.of("message", "Task deleted successfully"));
	}
}
