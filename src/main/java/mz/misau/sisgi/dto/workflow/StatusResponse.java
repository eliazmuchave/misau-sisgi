package mz.misau.sisgi.dto.workflow;

import lombok.Data;

import java.util.Date;

@Data
public class StatusResponse {
    private Long id;
    private String nameStatus;
    private int days;
    private Date created;
    private Date updated;
}
