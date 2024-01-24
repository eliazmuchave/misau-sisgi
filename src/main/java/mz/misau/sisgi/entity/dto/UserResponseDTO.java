package mz.misau.sisgi.entity.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Collection;
import java.util.Set;

@Data
@EqualsAndHashCode(exclude="roles")
public class UserResponseDTO {
    @NotNull
    private long id;
    @NotNull
    private String email;
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;

    private Set<RoleResponseDTO> roles;

}
