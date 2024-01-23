package mz.misau.sisgi.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
@Data
@EqualsAndHashCode(exclude="users")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "role_name", nullable = false)
    private String roleName;

    @ManyToMany(mappedBy = "roles", fetch = FetchType.LAZY)
    private Set<User> users = new HashSet<>();



}
