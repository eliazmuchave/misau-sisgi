package mz.misau.sisgi.dto.workflow;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class NotifiableResponse {
    @NotNull
    private Long id;
    private Date created;
    private Date updated;

    @NotNull
    private String email;
}
