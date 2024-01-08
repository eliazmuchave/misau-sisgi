package mz.misau.sisgi.entity;

import jakarta.persistence.*;

@Entity
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(name = "password")
    private String username;
    @Column(name = "password")
    private String password;
}
