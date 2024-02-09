package mz.misau.sisgi.controller.workflow;

import mz.misau.sisgi.entity.workflow.ImportProcess;
import mz.misau.sisgi.repository.workflow.ImportProcessRepository;
import mz.misau.sisgi.service.workflow.ImportProcessService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/importProcess")
public class ImportProcessController {
    private final ImportProcessService importProcessRepository;


    public ImportProcessController(ImportProcessService importProcessRepository) {
        this.importProcessRepository = importProcessRepository;
    }

    @GetMapping
    public ResponseEntity<List<ImportProcess>> getAll(){
        try{
            return null;
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
}
