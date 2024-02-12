package mz.misau.sisgi.controller.workflow;

import mz.misau.sisgi.dto.workflow.ImportProcessRequest;
import mz.misau.sisgi.dto.workflow.ImportProcessResponse;
import mz.misau.sisgi.entity.workflow.ImportProcess;
import mz.misau.sisgi.entity.workflow.WorkflowTask;
import mz.misau.sisgi.repository.workflow.ImportProcessRepository;
import mz.misau.sisgi.service.workflow.ImportProcessService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.transform.OutputKeys;
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
}
