package mz.misau.sisgi.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Collection;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
@EqualsAndHashCode(exclude="roles")
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotNull
    @Column(name = "username")
    private String email;
    @NotNull
    @Column(name = "password")
    private String password;
    @Column(name = "firstname")
    private String firstName;
    @Column(name = "lastname")
    private String lastName;
    @ManyToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    @JoinTable(name = "user_role", joinColumns = {@JoinColumn(name = "user_id")}, inverseJoinColumns = {@JoinColumn(name = "role_id")})
    private Set<Role> roles;




    @Override
    public String getUsername() {
        return this.email;
    }

    public void setPassword(String password){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        this.password = passwordEncoder.encode(password);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        roles.forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_"+role.getRoleName()));
        });
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
