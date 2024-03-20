package mz.misau.sisgi.entity.workflow;

import jakarta.persistence.*;
import lombok.Data;
import mz.misau.sisgi.entity.BaseEntity;

import java.util.Date;

@Entity
@Table(name = "comment")
@Data
public class Comment extends BaseEntity {


    @Column(name = "text")
    private String text;

    @Column(name = "user")
    private String user;

    @ManyToOne
    @JoinColumn(name = "process_id")
    private ImportProcess importProcess;
}
