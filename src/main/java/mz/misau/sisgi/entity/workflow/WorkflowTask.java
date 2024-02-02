package mz.misau.sisgi.entity.workflow;

import com.fasterxml.jackson.databind.ser.Serializers;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import mz.misau.sisgi.entity.BaseEntity;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "workflow_task")
@Data
@ToString(exclude="predictedStatusFlow")
public class WorkflowTask extends BaseEntity {

    @Column(name = "name", nullable = false)
    private String taskName;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "expected_end_date")
    private Date expectedEndDate;

    @ManyToOne
    @JoinColumn(name = "status_flow_id", nullable = true)
    private PredictedStatusFlow predictedStatusFlow;


}
