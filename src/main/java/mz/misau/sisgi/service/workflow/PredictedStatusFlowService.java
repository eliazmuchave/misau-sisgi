package mz.misau.sisgi.service.workflow;

import mz.misau.sisgi.dto.workflow.PredictedStatusFlowRequest;
import mz.misau.sisgi.dto.workflow.PredictedStatusFlowResponse;
import mz.misau.sisgi.entity.workflow.PredictedStatusFlow;
import mz.misau.sisgi.entity.workflow.Status;
import mz.misau.sisgi.repository.workflow.PredictedStatusFlowRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PredictedStatusFlowService {
    private final PredictedStatusFlowRepository predictedStatusFlowRepository;
    private final StatusService statusService;

    public PredictedStatusFlowService(PredictedStatusFlowRepository predictedStatusFlowRepository, StatusService statusService) {
        this.predictedStatusFlowRepository = predictedStatusFlowRepository;
        this.statusService = statusService;
    }

    public List<PredictedStatusFlow> getAll() {
        return predictedStatusFlowRepository.findAll();
    }

    public List<PredictedStatusFlowResponse> getAllResponse() {
        List<PredictedStatusFlow> predictedStatusFlows = getAll();
    List<PredictedStatusFlowResponse> responses =    predictedStatusFlows.stream().map(statusWorkflow -> convertToResponse(statusWorkflow)).collect(Collectors.toList());
        return responses;
    }

    public PredictedStatusFlowResponse convertToResponse(PredictedStatusFlow predictedStatusFlow){
        PredictedStatusFlowResponse predictedStatusFlowResponse = new PredictedStatusFlowResponse();
        BeanUtils.copyProperties(predictedStatusFlow, predictedStatusFlowResponse);
        if (predictedStatusFlow.getStatuses() != null){
            predictedStatusFlow.getStatuses().stream().forEach(status -> {
                predictedStatusFlowResponse.setStatuses(new ArrayList<>());
                predictedStatusFlowResponse.getStatuses().add(status.getId());});
        }
        return predictedStatusFlowResponse;
    }

    public PredictedStatusFlow convertFromRequest(PredictedStatusFlowRequest predictedStatusFlowRequest){
        PredictedStatusFlow predictedStatusFlow = new PredictedStatusFlow();
        BeanUtils.copyProperties(predictedStatusFlowRequest, predictedStatusFlow);
        return predictedStatusFlow;
    }

    public PredictedStatusFlowResponse add(PredictedStatusFlowRequest predictedStatusFlowRequest) {
        PredictedStatusFlow predictedStatusFlow = convertFromRequest(predictedStatusFlowRequest);
        return convertToResponse(predictedStatusFlowRepository.save(predictedStatusFlow));
    }

    public PredictedStatusFlow addStatuses(Long id, List<Long> ids) {

        PredictedStatusFlow predictedStatusFlow = predictedStatusFlowRepository.findById(id).orElseThrow();
        List<Status> statuses = statusService.getAllById(ids);
        predictedStatusFlow.setStatuses(statuses);
        predictedStatusFlowRepository.save(predictedStatusFlow);
        return predictedStatusFlow;



    }
}
