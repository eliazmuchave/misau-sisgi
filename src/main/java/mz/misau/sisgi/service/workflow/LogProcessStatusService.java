package mz.misau.sisgi.service.workflow;

import mz.misau.sisgi.dto.workflow.LogProcessStatusResponse;
import mz.misau.sisgi.entity.workflow.LogProcessStatus;
import mz.misau.sisgi.entity.workflow.PredictedStatusFlow;
import mz.misau.sisgi.entity.workflow.Status;
import mz.misau.sisgi.entity.workflow.WorkflowTask;
import mz.misau.sisgi.repository.workflow.LogProcessStatusRepository;
import mz.misau.sisgi.repository.workflow.WorkflowTaskRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LogProcessStatusService {
    private LogProcessStatusRepository logProcessStatusRepository;
    private WorkflowTaskRepository workflowTaskRepository;

    public LogProcessStatusService(LogProcessStatusRepository logProcessStatusRepository, WorkflowTaskRepository workflowTaskRepository) {
        this.logProcessStatusRepository = logProcessStatusRepository;
        this.workflowTaskRepository = workflowTaskRepository;
    }

    public LogProcessStatus getMostRecentStatusOf(WorkflowTask workflowTask){
        return  logProcessStatusRepository.findFirstByOrderByStartDate(workflowTask);
    }



    public void addStatus(WorkflowTask workflowTask, Status status){

        LogProcessStatus log = new LogProcessStatus();
        log.setStatus(status.getNameStatus());
        log.setStartDate(new Date());
        log.setExpectedDays(status.getDays());
        log.setWorkflowTask(workflowTask);

        logProcessStatusRepository.save(log);

    }

    public List<LogProcessStatusResponse> getLogByProcessId(Long processId) {
        WorkflowTask workflowTask = workflowTaskRepository.findById(processId).orElseThrow();
        List<LogProcessStatus> logs = logProcessStatusRepository.getByWorkflowTask(workflowTask);
        List<LogProcessStatusResponse> responses = logs.stream().map(logProcessStatus -> convertToFrom(logProcessStatus)).collect(Collectors.toList());
        return responses;
    }

    public LogProcessStatusResponse convertToFrom(LogProcessStatus logProcessStatus) {
        LogProcessStatusResponse response = new LogProcessStatusResponse();
        BeanUtils.copyProperties(logProcessStatus, response);
        return response;
    }
}
