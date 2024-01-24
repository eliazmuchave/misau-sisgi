package mz.misau.sisgi.entity.workflow;

import jakarta.persistence.*;
import lombok.Data;
import mz.misau.sisgi.entity.BaseEntity;

@Entity
@Table(name = "state")
@Data
public class Status extends BaseEntity {

    private String nameState;


}
