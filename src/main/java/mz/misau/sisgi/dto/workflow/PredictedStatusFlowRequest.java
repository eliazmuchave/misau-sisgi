package mz.misau.sisgi.dto.workflow;

import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import lombok.Data;
import mz.misau.sisgi.entity.workflow.Status;
import mz.misau.sisgi.entity.workflow.WorkflowTask;

import java.util.List;

@Data
public class PredictedStatusFlowRequest {
    private String name;
    private int daysToCompleteTotal;
    private List<Long> statuses;
}
