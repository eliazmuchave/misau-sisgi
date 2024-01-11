package mz.misau.sisgi.service;

import mz.misau.sisgi.entity.Role;
import mz.misau.sisgi.entity.User;
import mz.misau.sisgi.entity.dto.UserDTO;
import mz.misau.sisgi.entity.dto.UserResponseDTO;
import mz.misau.sisgi.repository.RoleRepository;
import mz.misau.sisgi.repository.UserRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public User addNewUser(User user) {
        User savedUser = userRepository.save(user);
        return savedUser;

    }

    public UserResponseDTO addNewUser(UserDTO userDTO) {
        User userToSave = convertFromDTO(userDTO);
        User user = addNewUser(userToSave);

        return convertUserResponseDTO(user);
    }

    public User convertFromDTO(UserDTO userDTO) {
        User user = new User();
        user.setPassword(userDTO.getPassword());
        user.setEmail(userDTO.getEmail());
        user.setLastName(userDTO.getLastName());
        user.setFirstName(userDTO.getFirstName());
        Set<Role> roles = roleRepository.findAllWhereRoleNameIn(userDTO.getRoles());
        user.setRoles(roles);

        return user;

    }

    public UserResponseDTO convertUserResponseDTO(User user){
        UserResponseDTO userResponse = new UserResponseDTO();
        userResponse.setId(user.getId());
        userResponse.setEmail(user.getEmail());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastName(user.getLastName());
        Set<String> roles = user.getRoles().stream().map(role -> role.getRoleName()).collect(Collectors.toSet());
        userResponse.setRoles(roles);
        return userResponse;
    }


}
