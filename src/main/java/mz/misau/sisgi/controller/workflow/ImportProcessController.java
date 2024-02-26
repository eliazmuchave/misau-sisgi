package mz.misau.sisgi.controller.workflow;

import jakarta.servlet.http.HttpServletRequest;
import mz.misau.sisgi.dto.workflow.ArrivalAndPickupDateRequest;
import mz.misau.sisgi.dto.workflow.ImportProcessRequest;
import mz.misau.sisgi.dto.workflow.ImportProcessResponse;
import mz.misau.sisgi.dto.workflow.WorkflowTaskResponse;
import mz.misau.sisgi.service.workflow.ImportProcessService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/importProcess")
public class ImportProcessController {
    private final ImportProcessService importProcessService;

    public ImportProcessController(ImportProcessService importProcessService) {
        this.importProcessService = importProcessService;
    }


    @GetMapping
    public ResponseEntity<List<ImportProcessResponse>> getAll() {
        try {
            List<ImportProcessResponse> all = importProcessService.getAllResponse();
            if (!all.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body(all);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<ImportProcessResponse> addNew(@RequestBody ImportProcessRequest importProcessRequest) {
        ImportProcessResponse response = importProcessService.add(importProcessRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImportProcessResponse> getById(@PathVariable Long id) {
        try {
            ImportProcessResponse response = importProcessService.getProcessById(id);
            if (response != null) {
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ImportProcessResponse> update(@RequestBody ImportProcessRequest importProcessRequest, @PathVariable Long id){
        ImportProcessResponse response = importProcessService.update(importProcessRequest, id);
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @PatchMapping("/updateDates")
    public ResponseEntity<ImportProcessResponse> updateArrivalAndPickupDate(@RequestBody ArrivalAndPickupDateRequest arrivalAndPickupDateRequest){

      try{
          ImportProcessResponse response = importProcessService.updateArrivalAndPickupDate(arrivalAndPickupDateRequest);

          return ResponseEntity.status(HttpStatus.OK).body(response);
      }catch (Exception e){
          return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
      }
    }

    @PatchMapping("/{id}/notify")
    public ResponseEntity notifyMeStatusChange(@PathVariable Long id, HttpServletRequest request){
        String token = request.getHeader("Authorization");

        ImportProcessResponse response =  importProcessService.subscribeStatusChange(id,token);
        return  ResponseEntity.status(HttpStatus.OK).body(response);


    }

    @PatchMapping("/{id}/forwardStatus")
    public ResponseEntity<ImportProcessResponse> forwardStatus(@PathVariable Long id){
        ImportProcessResponse importResponse =importProcessService.forwardImportStatus(id);
        return  ResponseEntity.status(HttpStatus.OK).body(importResponse);


    }
}
