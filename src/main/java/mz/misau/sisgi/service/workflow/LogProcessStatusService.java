package mz.misau.sisgi.service.workflow;

import mz.misau.sisgi.dto.workflow.LogProcessStatusResponse;
import mz.misau.sisgi.entity.workflow.LogProcessStatus;
import mz.misau.sisgi.repository.workflow.LogProcessStatusRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LogProcessStatusService {
    private LogProcessStatusRepository logProcessStatusRepository;

    public LogProcessStatusService(LogProcessStatusRepository logProcessStatusRepository) {
        this.logProcessStatusRepository = logProcessStatusRepository;
    }

    public void addLog(String currentStatus, String newStatus, Long processId) {
        LogProcessStatus log = new LogProcessStatus();
        log.setProcessId(processId);
        log.setCurrentStatus(currentStatus);
        log.setNewStatus(newStatus);
        logProcessStatusRepository.save(log);

    }

    public List<LogProcessStatusResponse> getLogByProcessId(Long processId) {
        List<LogProcessStatus> logs = logProcessStatusRepository.getByProcessId(processId);
        List<LogProcessStatusResponse> responses = logs.stream().map(logProcessStatus -> convertToFrom(logProcessStatus)).collect(Collectors.toList());
        return responses;
    }

    public LogProcessStatusResponse convertToFrom(LogProcessStatus logProcessStatus) {
        LogProcessStatusResponse response = new LogProcessStatusResponse();
        BeanUtils.copyProperties(logProcessStatus, response);
        return response;
    }
}
