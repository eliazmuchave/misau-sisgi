package mz.misau.sisgi.service;

import mz.misau.sisgi.entity.Role;
import mz.misau.sisgi.entity.dto.RoleDTO;
import mz.misau.sisgi.entity.dto.RoleResponseDTO;
import mz.misau.sisgi.repository.RoleRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> getAll(){
        List<Role>  roles = roleRepository.findAll();
        return roles;
    }

    public List<RoleResponseDTO> getAllRolesDTO(){
        List<Role> roles = getAll();
        List<RoleResponseDTO> responses = roles.stream().map(role -> {
            RoleResponseDTO response = new RoleResponseDTO();
            BeanUtils.copyProperties(role, response, "users");
            return  response;
        }).collect(Collectors.toList());
        return responses;
    }

    public RoleResponseDTO addNewRole(RoleDTO roleDTO) {

        Role roleToSave = convertFromDTO(roleDTO);
        Role role = roleRepository.save(roleToSave);
        return convertToResponseDTO(role);
    }

    public Role convertFromDTO(RoleDTO roleDTO) {
        Role role = new Role();
        role.setRoleName(roleDTO.getRoleName());
        return role;
    }

    public RoleResponseDTO convertToResponseDTO(Role role) {

        RoleResponseDTO response = new RoleResponseDTO();
        response.setRoleName(role.getRoleName());
        response.setId(role.getId());
        return response;

    }
}
