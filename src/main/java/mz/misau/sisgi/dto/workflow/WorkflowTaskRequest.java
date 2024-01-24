package mz.misau.sisgi.dto.workflow;

import jakarta.persistence.Column;
import lombok.Data;

import java.util.Date;

@Data
public class WorkflowTaskRequest {
    private String taskName;
    private Date startDate;
    private Date expectedEndDate;
}
