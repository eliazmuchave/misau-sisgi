package mz.misau.sisgi.service;

import mz.misau.sisgi.entity.Role;
import mz.misau.sisgi.entity.User;
import mz.misau.sisgi.entity.dto.RoleResponseDTO;
import mz.misau.sisgi.entity.dto.UserDTO;
import mz.misau.sisgi.entity.dto.UserResponseDTO;
import mz.misau.sisgi.repository.RoleRepository;
import mz.misau.sisgi.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.*;
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

    public List<User> getAll() {
        List<User> users = userRepository.findAll();

        return users;
    }

    public List<UserResponseDTO> getAllUsers() {

        List<User> users = getAll();

        List<UserResponseDTO> usersResponseDTO = users.stream().map(user -> convertUserResponseDTO(user)).collect(Collectors.toList());
        return usersResponseDTO;

    }

    public UserResponseDTO findById(Long id) {
        User user = userRepository.findById(id).orElse(new User());
        return convertUserResponseDTO(user);
    }

    public UserResponseDTO addNewUser(UserDTO userDTO) {
        User userToSave = convertFromDTO(userDTO);
        User user = addNewUser(userToSave);

        return convertUserResponseDTO(user);
    }

    public User convertFromDTO(UserDTO userDTO) {
        User user = new User();
        BeanUtils.copyProperties(userDTO, user, "id");
        return user;

    }

    public UserResponseDTO convertUserResponseDTO(User user) {
        UserResponseDTO userResponse = new UserResponseDTO();
        BeanUtils.copyProperties(user, userResponse);
        Set<RoleResponseDTO> rolesResponse = new HashSet<>();
        if (user.getRoles() != null) {
            rolesResponse = user.getRoles().stream().map(role -> {
                RoleResponseDTO roleResponse = new RoleResponseDTO();
                BeanUtils.copyProperties(role, roleResponse);
                return roleResponse;
            }).collect(Collectors.toSet());
        }
        userResponse.setRoles(rolesResponse);

        return userResponse;
    }

    public UserResponseDTO updateUser(UserDTO userDTO, Long id) {

        User user = userRepository.findById(id).orElse(null);

        if (user != null) {
            BeanUtils.copyProperties(userDTO, user, "id", "password");
            if(user.getRoles() != null) {

                List<Role> roles = roleRepository.findAllById(userDTO.getRoles());

                user.setRoles(new HashSet<>(roles));
            }
            userRepository.save(user);
            return convertUserResponseDTO(user);
        }
        return null;
    }


}
