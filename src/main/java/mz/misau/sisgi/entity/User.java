package mz.misau.sisgi.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(name = "username")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "firstName")
    private String firstname;
    @Column(name = "lastname")
    private String lastName;


}
