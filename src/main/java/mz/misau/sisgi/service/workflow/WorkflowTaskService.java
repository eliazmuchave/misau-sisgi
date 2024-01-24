package mz.misau.sisgi.service.workflow;

import mz.misau.sisgi.dto.workflow.WorkflowTaskRequest;
import mz.misau.sisgi.dto.workflow.WorkflowTaskResponse;
import mz.misau.sisgi.entity.workflow.WorkflowTask;
import mz.misau.sisgi.repository.workflow.WorkflowTaskRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.LongSummaryStatistics;
import java.util.stream.Collectors;

@Service
public class WorkflowTaskService {

    private final WorkflowTaskRepository workflowTaskRepository;

    public WorkflowTaskService(WorkflowTaskRepository workflowTaskRepository) {
        this.workflowTaskRepository = workflowTaskRepository;
    }
    public List<WorkflowTask> getAll(){
        return workflowTaskRepository.findAll();
    }
    public WorkflowTask save(WorkflowTask workflowTask){
        return workflowTaskRepository.save(workflowTask);
    }

    public WorkflowTaskResponse add(WorkflowTaskRequest workflowTaskRequest){
        WorkflowTask workflowTask = convertToEntity(workflowTaskRequest);
        return convertFromEntity(save(workflowTask));
    }
    public WorkflowTaskResponse convertFromEntity(WorkflowTask workflowTask){
        WorkflowTaskResponse response = new WorkflowTaskResponse();
        BeanUtils.copyProperties(workflowTask, response);
        return response;
    }

    public WorkflowTask convertToEntity(WorkflowTaskRequest workflowTaskRequest){
        WorkflowTask workflowTask = new WorkflowTask();
        BeanUtils.copyProperties(workflowTaskRequest, workflowTask);
        return workflowTask;
    }

    public List<WorkflowTaskResponse> getAllResponses() {
        List<WorkflowTask> all = getAll();
        List<WorkflowTaskResponse> responses = all.stream().map(workflowTask -> convertFromEntity(workflowTask)).collect(Collectors.toList());
        return responses;
    }
}
