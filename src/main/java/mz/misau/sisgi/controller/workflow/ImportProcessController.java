package mz.misau.sisgi.controller.workflow;

import mz.misau.sisgi.repository.workflow.ImportProcessRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("importProcess")
public class ImportProcessController {
    private final ImportProcessRepository importProcessRepository;

    public ImportProcessController(ImportProcessRepository importProcessRepository) {
        this.importProcessRepository = importProcessRepository;
    }
}
