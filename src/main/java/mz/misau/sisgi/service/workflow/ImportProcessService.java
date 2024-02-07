package mz.misau.sisgi.service.workflow;

import mz.misau.sisgi.repository.workflow.ImportProcessRepository;
import org.springframework.stereotype.Component;

@Component
public class ImportProcessService {

    private final ImportProcessRepository importProcessRepository;

    public ImportProcessService(ImportProcessRepository importProcessRepository) {
        this.importProcessRepository = importProcessRepository;
    }
}
