package com.taskflow.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private final SecretKey SECRET_KEY = Keys.hmacShaKeyFor("mysecretkeymysecretkeymysecretkey".getBytes());

	public String generateToken(String email) {
		return Jwts.builder().setSubject(email).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 86400000)).signWith(SECRET_KEY).compact();
	}

	public String extractEmail(String token) {
		Claims claims = Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody();

		return claims.getSubject();
	}
}
