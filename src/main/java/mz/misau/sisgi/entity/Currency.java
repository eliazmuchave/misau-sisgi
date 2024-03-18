package mz.misau.sisgi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "currency")
public class Currency extends  BaseEntity{

    private String name;
    private String symbol;
}
