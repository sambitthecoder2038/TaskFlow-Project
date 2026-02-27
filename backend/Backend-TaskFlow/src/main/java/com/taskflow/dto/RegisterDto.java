package com.taskflow.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterDto {
	private String fullName;
	private String email;
	private String password;
}