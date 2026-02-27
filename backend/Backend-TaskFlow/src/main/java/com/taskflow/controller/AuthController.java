package com.taskflow.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskflow.dto.LoginDto;
import com.taskflow.dto.RegisterDto;
import com.taskflow.services.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	// 🔹 REGISTER API
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody RegisterDto dto) {

		authService.register(dto);

		return ResponseEntity.ok(Map.of("message", "User Registered Successfully"));
	}

	// 🔹 LOGIN API (UPDATED)
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDto dto) {

		// service already returns token + name
		return ResponseEntity.ok(authService.login(dto));
	}
}
