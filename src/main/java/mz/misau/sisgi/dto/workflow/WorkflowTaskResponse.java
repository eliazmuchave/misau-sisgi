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
    private PredictedStatusFlowResponse workflow;
}
