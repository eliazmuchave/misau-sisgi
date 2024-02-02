package mz.misau.sisgi.service.workflow;

import mz.misau.sisgi.comunication.EmailService;
import mz.misau.sisgi.comunication.Notification;
import mz.misau.sisgi.dto.workflow.PredictedStatusFlowResponse;
import mz.misau.sisgi.dto.workflow.WorkflowTaskRequest;
import mz.misau.sisgi.dto.workflow.WorkflowTaskResponse;
import mz.misau.sisgi.entity.workflow.PredictedStatusFlow;
import mz.misau.sisgi.entity.workflow.WorkflowTask;
import mz.misau.sisgi.repository.workflow.PredictedStatusFlowRepository;
import mz.misau.sisgi.repository.workflow.WorkflowTaskRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.LongSummaryStatistics;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WorkflowTaskService {

    private final WorkflowTaskRepository workflowTaskRepository;
    private final PredictedStatusFlowRepository predictedStatusFlowRepository;
    private final EmailService emailService;

    public WorkflowTaskService(WorkflowTaskRepository workflowTaskRepository, PredictedStatusFlowRepository predictedStatusFlowRepository, EmailService emailService) {
        this.workflowTaskRepository = workflowTaskRepository;
        this.predictedStatusFlowRepository = predictedStatusFlowRepository;
        this.emailService = emailService;
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

        PredictedStatusFlow predictedStatusFlow = workflowTask.getPredictedStatusFlow();
       if (predictedStatusFlow != null){
           BeanUtils.copyProperties(predictedStatusFlow, predictedStatusFlowResponse);
           response.setWorkflow(predictedStatusFlowResponse);
       }


        return response;
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
}
