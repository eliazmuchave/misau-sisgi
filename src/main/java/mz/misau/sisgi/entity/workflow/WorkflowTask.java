package mz.misau.sisgi.entity.workflow;

import com.fasterxml.jackson.databind.ser.Serializers;
import jakarta.persistence.*;
import lombok.Data;
import mz.misau.sisgi.entity.BaseEntity;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "workflow_task")
@Data
public class WorkflowTask extends BaseEntity {

    @Column(name = "name", nullable = false)
    private String taskName;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "expected_end_date")
    private Date expectedEndDate;

    @OneToMany
    private List<WorkflowTaskStatus> workflowTaskStatuses;


}
