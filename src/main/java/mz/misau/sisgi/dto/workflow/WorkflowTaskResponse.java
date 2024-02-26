package mz.misau.sisgi.dto.workflow;

import lombok.Data;

import java.util.Date;

@Data
public class WorkflowTaskResponse {
    private Long id;
    private String taskName;
    private Date startDate;
    private Date expectedEndDate;
    private Date created;
    private Date updated;
    private String currentStatus;
    private boolean closed;
    private boolean done;
    private PredictedStatusFlowResponse workflow;
}
