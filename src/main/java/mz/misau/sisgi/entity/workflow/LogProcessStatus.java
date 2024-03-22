package mz.misau.sisgi.entity.workflow;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import mz.misau.sisgi.entity.BaseEntity;

@Data
@Entity
@Table(name = "log_process_status")
public class LogProcessStatus extends BaseEntity {

    private String currentStatus;
    private String newStatus;
    private Long processId;
}
