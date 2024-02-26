package mz.misau.sisgi.entity.workflow;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import mz.misau.sisgi.entity.BaseEntity;

import java.util.List;

@Entity
@Table(name = "predicted_state_flow")
@Data
@ToString(exclude = {"statuses", "workflowTasks"})


public class PredictedStatusFlow extends BaseEntity {

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "predictedStatusFlow")
    private List<WorkflowTask> workflowTasks;

    @ManyToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    @JoinTable(name = "status_workflow_join", joinColumns = {@JoinColumn(name = "predicted_state_flow_id")}, inverseJoinColumns = {@JoinColumn(name = "status_id")})
    private List<Status> statuses;

    public int getTotalStatuses() {

        return statuses.size();
    }


}
