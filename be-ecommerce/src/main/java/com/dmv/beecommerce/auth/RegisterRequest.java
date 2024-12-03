package com.dmv.beecommerce.auth;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @NotNull(message = "Full name is required")
    @NotEmpty(message = "Full name cannot be empty")
    private String fullName;
    @NotNull(message = "Address is required")
    @NotEmpty(message = "Address cannot be empty")
    private String address;
    @Pattern(regexp = "^\\+?[0-9]{10}$", message = "Invalid phone number")
    private String phoneNumber;
    @NotNull(message = "Username is required")
    @NotEmpty(message = "Username cannot be empty")
    @Size(min = 5, max = 15, message = "Username must be between 5 and 15 characters")
    @Pattern(regexp = "\\S+", message = "User name must not contain spaces")
    private String userName;
    @NotNull(message = "Password is required")
    @Size(min = 5, message = "Password must be at least 8 characters long")
    private String password;

}
