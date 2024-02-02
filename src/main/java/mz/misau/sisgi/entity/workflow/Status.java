package mz.misau.sisgi.entity.workflow;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;
import mz.misau.sisgi.entity.BaseEntity;
import org.hibernate.validator.internal.util.stereotypes.Lazy;

import java.util.List;

@Entity
@Table(name = "state")
@Data
@EqualsAndHashCode(exclude={"predictedStatusFlows" })
public class Status extends BaseEntity {

    @ManyToMany(mappedBy = "statuses", fetch = FetchType.LAZY)
    private List<PredictedStatusFlow> predictedStatusFlows;
    @NotBlank
    private String nameStatus;


}
