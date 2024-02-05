package mz.misau.sisgi.entity.workflow;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import mz.misau.sisgi.entity.BaseEntity;
import org.springframework.data.annotation.TypeAlias;

import java.util.Date;

@Entity
@Table(name = "notifiable")
@Data
public class Notifiable extends BaseEntity {
    @Column(name = "email")
    private String email;

    @ManyToOne
    private WorkflowTask workflowTask;
}
