package mz.misau.sisgi.controller.workflow;

import mz.misau.sisgi.dto.workflow.StatusReqest;
import mz.misau.sisgi.dto.workflow.StatusResponse;
import mz.misau.sisgi.entity.workflow.Status;
import mz.misau.sisgi.service.workflow.StatusService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/status")
public class StatusController {

    private final StatusService statusService;

    public StatusController(StatusService statusService) {
        this.statusService = statusService;
    }

    @GetMapping
    public ResponseEntity< List<StatusResponse>> getAllStatus(){
        try{
           return ResponseEntity.status(HttpStatus.OK).body( statusService.getAllResponse());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        }

    }

    @PostMapping
    public ResponseEntity<StatusResponse> addStatus(@RequestBody StatusReqest statusReqest){

        StatusResponse response =  statusService.add(statusReqest);
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @PatchMapping("/{id}")
    public ResponseEntity<StatusResponse> updateStatus(@RequestBody StatusReqest statusReqest, @PathVariable Long id){
        StatusResponse statusResponse = statusService.updateStatus(statusReqest, id);
        return ResponseEntity.status(HttpStatus.OK).body(statusResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StatusResponse> getById( @PathVariable Long id){
        StatusResponse statusResponse = statusService.getById(id);
        return ResponseEntity.status(HttpStatus.OK).body(statusResponse);
    }
}
