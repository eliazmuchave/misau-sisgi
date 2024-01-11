package mz.misau.sisgi.controller;

import mz.misau.sisgi.entity.Role;
import mz.misau.sisgi.entity.dto.RoleDTO;
import mz.misau.sisgi.repository.RoleRepository;
import mz.misau.sisgi.service.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api/roles")
public class RoleController {
    private final RoleService roleService;

     public RoleController(RoleService roleService){
         this.roleService = roleService;
     }

     @PostMapping
    public ResponseEntity addUser(@RequestBody RoleDTO roleDTO) throws URISyntaxException {

        Role addedRole = roleService.addNewRole(roleDTO);
         return ResponseEntity.created(new URI("/user" + addedRole.getId())).body(addedRole);


     }

}
