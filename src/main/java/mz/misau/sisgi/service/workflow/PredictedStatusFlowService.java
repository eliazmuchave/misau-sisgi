package mz.misau.sisgi.service.workflow;

import mz.misau.sisgi.dto.workflow.PredictedStatusFlowRequest;
import mz.misau.sisgi.dto.workflow.PredictedStatusFlowResponse;
import mz.misau.sisgi.entity.workflow.PredictedStatusFlow;
import mz.misau.sisgi.repository.workflow.PredictedStatusFlowRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PredictedStatusFlowService {
    private final PredictedStatusFlowRepository predictedStatusFlowRepository;

    public PredictedStatusFlowService(PredictedStatusFlowRepository predictedStatusFlowRepository) {
        this.predictedStatusFlowRepository = predictedStatusFlowRepository;
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
}
