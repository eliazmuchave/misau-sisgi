package mz.misau.sisgi.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String email;
    private String token;
}
