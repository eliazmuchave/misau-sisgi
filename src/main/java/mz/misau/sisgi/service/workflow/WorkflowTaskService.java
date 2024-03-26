package mz.misau.sisgi.service.workflow;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import mz.misau.sisgi.auth.JwtUtil;
import mz.misau.sisgi.comunication.EmailService;
import mz.misau.sisgi.comunication.Notification;
import mz.misau.sisgi.comunication.NotificationRepository;
import mz.misau.sisgi.dto.workflow.PredictedStatusFlowResponse;
import mz.misau.sisgi.dto.workflow.WorkflowTaskRequest;
import mz.misau.sisgi.dto.workflow.WorkflowTaskResponse;
import mz.misau.sisgi.entity.workflow.*;
import mz.misau.sisgi.repository.workflow.NotifiableRepository;
import mz.misau.sisgi.repository.workflow.PredictedStatusFlowRepository;
import mz.misau.sisgi.repository.workflow.WorkflowTaskRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkflowTaskService {

    private final WorkflowTaskRepository workflowTaskRepository;
    private final PredictedStatusFlowRepository predictedStatusFlowRepository;
    private final EmailService emailService;
    private final NotificationRepository notificationRepository;
    private final NotifiableRepository notifiableRepository;
    private final LogProcessStatusService logService;
    private final JwtUtil jwtUtil;

    public WorkflowTaskService(WorkflowTaskRepository workflowTaskRepository, PredictedStatusFlowRepository predictedStatusFlowRepository, EmailService emailService, NotificationRepository notificationRepository, NotifiableRepository notifiableRepository, LogProcessStatusService logService, JwtUtil jwtUtil) {
        this.workflowTaskRepository = workflowTaskRepository;
        this.predictedStatusFlowRepository = predictedStatusFlowRepository;
        this.emailService = emailService;
        this.notificationRepository = notificationRepository;
        this.notifiableRepository = notifiableRepository;
        this.logService = logService;
        this.jwtUtil = jwtUtil;
    }

    public List<WorkflowTask> getAll() {
        return workflowTaskRepository.findAll();
    }

    public WorkflowTask save(WorkflowTask workflowTask) {
        return workflowTaskRepository.save(workflowTask);
    }

    public WorkflowTaskResponse add(WorkflowTaskRequest workflowTaskRequest) {
        WorkflowTask workflowTask = convertToEntity(workflowTaskRequest);

        PredictedStatusFlow statusFlow = predictedStatusFlowRepository.findById(workflowTaskRequest.getStatusFlow()).get();
        workflowTask.setPredictedStatusFlow(statusFlow);
        return convertFromEntity(save(workflowTask));
    }

    public WorkflowTaskResponse convertFromEntity(WorkflowTask workflowTask) {
        WorkflowTaskResponse response = new WorkflowTaskResponse();

        PredictedStatusFlowResponse predictedStatusFlowResponse = new PredictedStatusFlowResponse();
        BeanUtils.copyProperties(workflowTask, response);

        String currentStatus = getCurrentStatusName(workflowTask);
        response.setCurrentStatus(currentStatus);

        PredictedStatusFlow predictedStatusFlow = workflowTask.getPredictedStatusFlow();
        if (predictedStatusFlow != null) {
            BeanUtils.copyProperties(predictedStatusFlow, predictedStatusFlowResponse);
            response.setWorkflow(predictedStatusFlowResponse);
        }


        return response;
    }

    protected String getCurrentStatusName(WorkflowTask workflowTask) {
    LogProcessStatus log = logService.getMostRecentStatusOf(workflowTask);
    if (log == null)
        return "";
    return log.getStatus();

    }

    protected void forwardStatus(WorkflowTask workflowTask) {

        PredictedStatusFlow predictedStatusFlow = workflowTask.getPredictedStatusFlow();

        if (predictedStatusFlow != null) {
            List<Status> statuses = predictedStatusFlow.getStatuses();
            try {
                if (statuses != null && !statuses.isEmpty()) {


                        Status status = predictedStatusFlow.getStatuses().get(workflowTask.getCurrentStatus());
                        workflowTaskRepository.save(workflowTask);
                        logService.addStatus(workflowTask, status);


                    workflowTask.forwardStatus();
                    workflowTaskRepository.save(workflowTask);



                }

            } catch (IndexOutOfBoundsException e) {
                workflowTask.setDone(true);
                workflowTaskRepository.save(workflowTask);


            }

        }

    }

    public WorkflowTask convertToEntity(WorkflowTaskRequest workflowTaskRequest) {
        WorkflowTask workflowTask = new WorkflowTask();
        BeanUtils.copyProperties(workflowTaskRequest, workflowTask);
        return workflowTask;
    }

    public List<WorkflowTaskResponse> getAllResponses() {
        List<WorkflowTask> all = getAll();

        List<WorkflowTaskResponse> responses = all.stream().map(workflowTask -> convertFromEntity(workflowTask)).collect(Collectors.toList());
        return responses;
    }

    public WorkflowTaskResponse getById(Long id) {
        WorkflowTask task = workflowTaskRepository.findById(id).orElse(new WorkflowTask());
        return convertFromEntity(task);
    }

    public WorkflowTaskResponse forwardStatus(Long id) {

        WorkflowTask task = workflowTaskRepository.findById(id).orElseThrow();

        forwardStatus(task);

        notifyStatusChange(task);
        return convertFromEntity(task);


    }

    private void notifyStatusChange(WorkflowTask workflowTask) {
        if (workflowTask != null) {
            if (workflowTask.getNotifiables() != null) {
                List<Notification> notifications = new ArrayList<>();
                workflowTask.getNotifiables().forEach(notifiable -> {

                    LocalDate date = LocalDate.now();
                    String dateNow = date.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));

                    LocalTime time = LocalTime.now();
                    String timeNow = time.format(DateTimeFormatter.ofPattern("HH:mm"));

                    Notification notification = new Notification();
                    String text = """
                            O processo %s foi actualizado  para o estado: %s no dia %s às  %s
                            """.formatted(workflowTask.getTaskName(), getCurrentStatusName(workflowTask), dateNow, timeNow);
                    notification.setSubject("Actualização do Estado do Processo - " + workflowTask.getTaskName());
                    notification.setText(text);
                    notification.setDestination(notifiable.getEmail());
                    notifications.add(notification);

                });

                notificationRepository.saveAll(notifications);

            }
        }
    }

    public void notifyMe(@NotNull WorkflowTask workflowTask, @Email String userEmail) {
        Notifiable notifiable = new Notifiable();
        notifiable.setWorkflowTask(workflowTask);
        notifiable.setEmail(userEmail);
        notifiableRepository.save(notifiable);

    }

    public WorkflowTaskResponse notifyStatusChange(Long workflowId, String authorization) {
        WorkflowTask workflowTask = workflowTaskRepository.findById(workflowId).orElseThrow();
        String email = jwtUtil.getEmailFromToken(authorization);
        notifyMe(workflowTask, email);
        return convertFromEntity(workflowTask);
    }
}
