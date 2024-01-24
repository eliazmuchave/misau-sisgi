package mz.misau.sisgi.entity.workflow;

import jakarta.persistence.*;
import lombok.Data;
import mz.misau.sisgi.entity.BaseEntity;

@Entity
@Table(name = "workflow_task")
@Data
public class Comment extends BaseEntity {


    @Column(name = "text")
    private String text;
}
