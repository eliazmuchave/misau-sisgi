package mz.misau.sisgi.service.workflow;

import mz.misau.sisgi.dto.workflow.StatusReqest;
import mz.misau.sisgi.dto.workflow.StatusResponse;
import mz.misau.sisgi.entity.workflow.Status;
import mz.misau.sisgi.repository.workflow.StatusRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StatusService {
    private final StatusRepository statusRepository;

    public StatusService(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    public List<Status> getAll(){
        return statusRepository.findAll();
    }

    public Status add(Status status){
        return statusRepository.save(status);
    }

    public List<StatusResponse> getAllResponse(){
        List<Status> statuses = getAll();
        List<StatusResponse> responses =  statuses.stream().map(status ->
            convertToResponse(status)
        ).collect(Collectors.toList());
        return responses;
    }
    public StatusResponse convertToResponse(Status status){
        StatusResponse response = new StatusResponse();
        BeanUtils.copyProperties(status, response);
        return response;
    }

    public List<Status> getAllById(List<Long> ids){
        List<Status> statues = statusRepository.findAllById(ids);
        return statues;
    }

    public Status convertToStatus(StatusReqest statusReqest){
        Status status = new Status();
        BeanUtils.copyProperties(statusReqest, status);
        return status;
    }

    public StatusResponse add(StatusReqest statusReqest) {
        Status status = convertToStatus(statusReqest);
        add(status);
        return  convertToResponse(status);

    }

    public StatusResponse updateStatus(StatusReqest statusReqest, Long id) {
        Status status = statusRepository.findById(id).orElseThrow();
        BeanUtils.copyProperties(statusReqest, status,"id");
        statusRepository.save(status);
        return convertToResponse(status);

    }

    public StatusResponse getById(Long id) {
        Status status = statusRepository.findById(id).orElseThrow();
        return convertToResponse(status);
    }
}
