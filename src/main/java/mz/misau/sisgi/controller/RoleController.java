package mz.misau.sisgi.controller;

import mz.misau.sisgi.entity.Role;
import mz.misau.sisgi.entity.dto.RoleDTO;
import mz.misau.sisgi.entity.dto.RoleResponseDTO;
import mz.misau.sisgi.repository.RoleRepository;
import mz.misau.sisgi.service.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/roles")
public class RoleController {
    private final RoleService roleService;

     public RoleController(RoleService roleService){
         this.roleService = roleService;
     }

     @PostMapping
    public ResponseEntity addUser(@RequestBody RoleDTO roleDTO) throws URISyntaxException {

        RoleResponseDTO responseDTO = roleService.addNewRole(roleDTO);
         return ResponseEntity.created(new URI("/roles" + responseDTO.getId())).body(responseDTO);


     }

     @GetMapping
    public List<RoleResponseDTO> getAllRoles(){
         return roleService. getAllRolesDTO();
     }

}
