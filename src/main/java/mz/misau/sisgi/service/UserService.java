package mz.misau.sisgi.service;

import mz.misau.sisgi.entity.Role;
import mz.misau.sisgi.entity.User;
import mz.misau.sisgi.entity.dto.UserDTO;
import mz.misau.sisgi.repository.RoleRepository;
import mz.misau.sisgi.repository.UserRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService {
    private final UserRepository userRepository;

    private final RoleRepository roleRepository;
    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public User addNewUser(User user){
        User savedUser = userRepository.save(user);
        return savedUser;

    }
    public User addNewUser(UserDTO userDTO){
        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        System.out.println(userDTO.getRoles());
        Set<Role> roles = roleRepository.findAllWhereRoleNameIn(userDTO.getRoles());
        System.out.println(roles);
        user.setRoles(roles);
        return addNewUser(user);
    }


}
