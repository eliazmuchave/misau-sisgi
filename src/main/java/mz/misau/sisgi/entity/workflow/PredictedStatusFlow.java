package mz.misau.sisgi.entity.workflow;

import jakarta.persistence.*;
import lombok.Data;
import mz.misau.sisgi.entity.BaseEntity;

@Entity
@Table(name = "predicted_state_flow")
@Data
public class PredictedStatusFlow extends BaseEntity {

}
