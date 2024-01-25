package mz.misau.sisgi.entity.workflow;

import jakarta.persistence.*;
import lombok.Data;
import mz.misau.sisgi.entity.BaseEntity;
import org.hibernate.validator.internal.util.stereotypes.Lazy;

import java.util.List;

@Entity
@Table(name = "state")
@Data
public class Status extends BaseEntity {

    @ManyToMany(mappedBy = "statuses", fetch = FetchType.LAZY)
    private List<PredictedStatusFlow> predictedStatusFlows;
    private String nameStatus;


}
