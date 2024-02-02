package mz.misau.sisgi.entity.workflow;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import mz.misau.sisgi.entity.BaseEntity;

@Entity
@Table(name = "workflow_task_status")
@Data
@EqualsAndHashCode(exclude={"workflowTask"})
public class WorkflowTaskStatus extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "workflow_task_id", nullable = false)
    private WorkflowTask workflowTask;

    @JoinColumn(name = "status_id")
    @ManyToOne
    private Status status;

    @Column(name = "predicted_days")
    private int predictedNumberDays;


}
