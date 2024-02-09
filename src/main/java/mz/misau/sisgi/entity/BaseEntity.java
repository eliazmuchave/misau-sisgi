package mz.misau.sisgi.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@MappedSuperclass
@Data
public class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Date created;

    private Date updated;

    @PrePersist
    public void onCreate(){
        this.created = new Date();
    }
    @PreUpdate
    public void onUpdate(){
        this.updated = new Date();
    }
}
