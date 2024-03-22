package mz.misau.sisgi.dto.workflow;

import lombok.Data;

import java.util.Date;

@Data
public class LogProcessStatusResponse {
    private String currentStatus;
    private String newStatus;
    private Long processId;
    private Date created;
}
