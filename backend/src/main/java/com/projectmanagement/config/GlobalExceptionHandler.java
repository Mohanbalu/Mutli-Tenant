package com.projectmanagement.config;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleBadCredentials(BadCredentialsException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Invalid email or password");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        Map<String, String> error = new HashMap<>();
        String message = ex.getMostSpecificCause().getMessage();
        
        if (message != null && message.contains("UKSFR9257MBJKOWOS3CI3E22AY2_INDEX_3")) {
            error.put("error", "The organization name you chose is already taken. Please try a different name or add a unique identifier (e.g., 'Acme Corp' instead of 'Acme').");
        } else if (message != null && message.contains("email")) {
            error.put("error", "This email address is already registered. Please use a different email or try logging in.");
        } else {
            error.put("error", "A conflict occurred while processing your request. Please check your input and try again.");
        }
        
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map<String, String>> handleConstraintViolation(ConstraintViolationException ex) {
        Map<String, String> error = new HashMap<>();
        String message = ex.getMessage();
        
        if (message != null && message.contains("UKSFR9257MBJKOWOS3CI3E22AY2_INDEX_3")) {
            error.put("error", "The organization name you chose is already taken. Please try a different name or add a unique identifier (e.g., 'Acme Corp' instead of 'Acme').");
        } else if (message != null && message.contains("email")) {
            error.put("error", "This email address is already registered. Please use a different email or try logging in.");
        } else {
            error.put("error", "A database constraint was violated. Please check your input and try again.");
        }
        
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception ex) {
        Map<String, String> error = new HashMap<>();
        String message = ex.getMessage();
        
        // Check for specific database constraint violations
        if (message != null && message.contains("UKSFR9257MBJKOWOS3CI3E22AY2_INDEX_3")) {
            error.put("error", "The organization name you chose is already taken. Please try a different name or add a unique identifier (e.g., 'Acme Corp' instead of 'Acme').");
        } else if (message != null && message.contains("email")) {
            error.put("error", "This email address is already registered. Please use a different email or try logging in.");
        } else if (message != null && (message.contains("Unique index") || message.contains("primary key violation"))) {
            error.put("error", "A conflict occurred while processing your request. Please check your input and try again.");
        } else {
            error.put("error", "An unexpected error occurred. Please try again later.");
        }
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
