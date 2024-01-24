package mz.misau.sisgi.dto.workflow;

import lombok.Data;

import java.util.Date;

@Data
public class StatusResponse {
    private Long id;
    private String nameState;
    private Date created;
    private Date updated;
}
