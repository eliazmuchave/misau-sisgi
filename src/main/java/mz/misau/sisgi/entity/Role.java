package mz.misau.sisgi.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "role", nullable = false)
    private String role;

    @ManyToMany(mappedBy = "users")
    private Set<User> users = new HashSet<>();



}
