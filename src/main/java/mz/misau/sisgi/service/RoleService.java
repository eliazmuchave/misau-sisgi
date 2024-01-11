package mz.misau.sisgi.service;

import mz.misau.sisgi.entity.Role;
import mz.misau.sisgi.entity.dto.RoleDTO;
import mz.misau.sisgi.repository.RoleRepository;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role addNewRole(RoleDTO roleDTO) {

        Role role = new Role();
        role.setRoleName(roleDTO.getRoleName());
        return roleRepository.save(role);
    }
}
