package mz.misau.sisgi.entity.workflow;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import mz.misau.sisgi.entity.BaseEntity;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "workflow_task")
@Data
@ToString(exclude="predictedStatusFlow")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class WorkflowTask extends BaseEntity {

    @Column(name = "name", nullable = false)
    private String taskName;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "expected_end_date")
    private Date expectedEndDate;

    @Column(name = "current_status")
    private int currentStatus;

    @ManyToOne
    @JoinColumn(name = "status_flow_id", nullable = true)
    private PredictedStatusFlow predictedStatusFlow;

    @OneToMany(mappedBy = "workflowTask")
    private List<Notifiable> notifiables;


    public void forwardStatus() {
        currentStatus += 1;

    }
}
