package com.openclassrooms.mddapi.payload.request;

import javax.validation.constraints.*;

import lombok.Data;

@Data
public class SignupRequest {
  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(min = 3, max = 20)
  private String username;

  @NotBlank
  @Size(min = 6, max = 40)
  private String password;

  public SignupRequest() {
  }

  public SignupRequest(String email, String username, String password) {
    this.email = email;
    this.username = username;
    this.password = password;
  }

  // Getters et setters générés par Lombok @Data, donc pas besoin de les définir
  // ici explicitement
}
