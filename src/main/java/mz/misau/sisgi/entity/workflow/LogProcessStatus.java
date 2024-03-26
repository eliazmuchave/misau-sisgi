package mz.misau.sisgi.entity.workflow;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import mz.misau.sisgi.entity.BaseEntity;

import java.util.Date;

@Data
@Entity
@Table(name = "log_process_status")
public class LogProcessStatus extends BaseEntity {

    @ManyToOne(optional = false)
    private WorkflowTask workflowTask;
    private String status;
    private Date startDate;
    private Date endDate;
    private int expectedDays;

}
