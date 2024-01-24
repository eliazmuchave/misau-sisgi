package mz.misau.sisgi.repository;

import mz.misau.sisgi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findUserByEmail(String email) throws UsernameNotFoundException;
}
