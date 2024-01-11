package mz.misau.sisgi.entity.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String email;
    private String token;
}
