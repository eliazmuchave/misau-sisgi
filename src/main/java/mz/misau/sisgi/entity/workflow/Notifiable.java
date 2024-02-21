package mz.misau.sisgi.entity.workflow;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import mz.misau.sisgi.entity.BaseEntity;
import org.springframework.data.annotation.TypeAlias;

import java.util.Date;

@Entity
@Table(name = "notifiable")
@Data
@ToString( exclude = "workflowTask")
public class Notifiable extends BaseEntity {
    @Column(name = "email")
    private String email;

    @ManyToOne(optional = true)
    private WorkflowTask workflowTask;
}
