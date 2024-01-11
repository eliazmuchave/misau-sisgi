package mz.misau.sisgi.entity.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RoleResponseDTO {
    @NotNull
    private long id;
    @NotNull
    private String roleName;

}
