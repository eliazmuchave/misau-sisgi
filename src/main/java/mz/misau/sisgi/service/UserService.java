package mz.misau.sisgi.service;

import mz.misau.sisgi.comunication.Notification;
import mz.misau.sisgi.comunication.NotificationRepository;
import mz.misau.sisgi.entity.Role;
import mz.misau.sisgi.entity.User;
import mz.misau.sisgi.dto.RoleResponseDTO;
import mz.misau.sisgi.dto.UserDTO;
import mz.misau.sisgi.dto.UserResponseDTO;
import mz.misau.sisgi.repository.RoleRepository;
import mz.misau.sisgi.repository.UserRepository;
import mz.misau.sisgi.util.PasswordGenerator;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;

    private final RoleRepository roleRepository;
    private final NotificationRepository notificationRepository;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, NotificationRepository notificationRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.notificationRepository = notificationRepository;
    }

    public User addNewUser(User user) {
        User savedUser = userRepository.save(user);
        String password = PasswordGenerator.create(8);
        user.setPassword(password);
        notifyCredentials(user,password);
        return savedUser;

    }
    private void notifyCredentials(User user, String password){
        Notification notification = new Notification();
        notification.setDestination(user.getEmail());
        notification.setSubject("Dados de Acesso à Sua Conta");
        String text = """
                Seus dados de acesso ao Sistema de Gestão de Actividades do MISAU foram criados com sucesso!
                Nome do Utilizador: %s
                Password: %s
                Endereço: http://localhost:8080
                """.formatted(user.getEmail(), password);
        notification.setText(text);
        notificationRepository.save(notification);
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
