package mz.misau.sisgi.controller;

import mz.misau.sisgi.entity.User;
import mz.misau.sisgi.entity.dto.UserDTO;
import mz.misau.sisgi.entity.dto.UserResponseDTO;
import mz.misau.sisgi.repository.UserRepository;
import mz.misau.sisgi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {

        this.userService = userService;
    }

    @GetMapping
    public List<UserResponseDTO> getAllUsers() {

        return userService.getAllUsers();

    }

    @PostMapping
    public ResponseEntity createUser(@RequestBody UserDTO userDTO) throws URISyntaxException {
        UserResponseDTO userResponseDTO = userService.addNewUser(userDTO);

        return ResponseEntity.created(new URI("/user" + userResponseDTO.getId())).body(userResponseDTO);
    }

    @GetMapping("/{id}")
    public UserResponseDTO getUser(@PathVariable Long id) {
        return userService.findById(id);

    }
    @PatchMapping("/{id}")
    public UserResponseDTO updateUser(@RequestBody UserDTO userDTO, @PathVariable Long id){

       return userService.updateUser(userDTO, id);
    }

}
