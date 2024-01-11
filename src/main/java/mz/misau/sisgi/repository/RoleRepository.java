package mz.misau.sisgi.repository;

import mz.misau.sisgi.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public interface RoleRepository extends JpaRepository<Role, Long> {
    public List findByRoleName(String roleName);

    @Query("SELECT role FROM Role as role where role.roleName in :names")
    public Set<Role> findAllWhereRoleNameIn(@Param("names") Collection<String> roleNames);
}
