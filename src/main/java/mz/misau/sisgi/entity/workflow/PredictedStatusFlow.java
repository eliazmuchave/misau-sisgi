package mz.misau.sisgi.entity.workflow;

import jakarta.persistence.*;
import lombok.Data;
import mz.misau.sisgi.entity.BaseEntity;

import java.util.List;

@Entity
@Table(name = "predicted_state_flow")
@Data
public class PredictedStatusFlow extends BaseEntity {

    @Column(name = "name")
    private String name;

    @OneToMany
    private List<WorkflowTask> workflowTasks;
    @OneToMany
    private List<Status> statuses;



}
