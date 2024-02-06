package mz.misau.sisgi.entity.workflow;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import mz.misau.sisgi.entity.BaseEntity;

@Entity
@Table(name = "goods")
@Data
public class Goods extends BaseEntity {

    @Column(name = "name")
    private String name;
}
