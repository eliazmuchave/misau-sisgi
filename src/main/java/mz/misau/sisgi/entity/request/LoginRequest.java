package mz.misau.sisgi.entity.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
