package mz.misau.sisgi.service.workflow;

import mz.misau.sisgi.auth.JwtUtil;
import mz.misau.sisgi.comunication.EmailService;
import mz.misau.sisgi.comunication.NotificationRepository;
import mz.misau.sisgi.repository.workflow.ImportProcessRepository;
import mz.misau.sisgi.repository.workflow.NotifiableRepository;
import mz.misau.sisgi.repository.workflow.PredictedStatusFlowRepository;
import mz.misau.sisgi.repository.workflow.WorkflowTaskRepository;
import org.springframework.stereotype.Component;

@Component
public class ImportProcessService extends WorkflowTaskService{
    private final ImportProcessRepository importProcessRepository;
    public ImportProcessService(WorkflowTaskRepository workflowTaskRepository, PredictedStatusFlowRepository predictedStatusFlowRepository, EmailService emailService, NotificationRepository notificationRepository, NotifiableRepository notifiableRepository, JwtUtil jwtUtil, ImportProcessRepository importProcessRepository) {
        super(workflowTaskRepository, predictedStatusFlowRepository, emailService, notificationRepository, notifiableRepository, jwtUtil);
        this.importProcessRepository = importProcessRepository;
    }
}
