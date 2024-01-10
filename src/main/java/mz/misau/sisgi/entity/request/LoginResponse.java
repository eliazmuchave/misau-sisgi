package mz.misau.sisgi.entity.request;

import lombok.Data;

@Data
public class LoginResponse {
    private String email;
    private String token;
}
