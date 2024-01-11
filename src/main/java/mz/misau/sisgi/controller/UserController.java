package mz.misau.sisgi.controller;

import mz.misau.sisgi.entity.User;
import mz.misau.sisgi.entity.dto.UserDTO;
import mz.misau.sisgi.repository.UserRepository;
import mz.misau.sisgi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private UserRepository userRepository;
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {

        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    @PostMapping
    public ResponseEntity createUser(@RequestBody UserDTO userDTO) throws URISyntaxException {
        User savedUser = userService.addNewUser(userDTO);
        return ResponseEntity.created(new URI("/user" + savedUser.getId())).body(savedUser);
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow(RuntimeException::new);
        return user;
    }

}
