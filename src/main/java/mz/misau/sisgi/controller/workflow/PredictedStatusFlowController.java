package mz.misau.sisgi.controller.workflow;

import mz.misau.sisgi.dto.workflow.PredictedStatusFlowRequest;
import mz.misau.sisgi.dto.workflow.PredictedStatusFlowResponse;
import mz.misau.sisgi.dto.workflow.StatusReqest;
import mz.misau.sisgi.entity.workflow.PredictedStatusFlow;
import mz.misau.sisgi.service.workflow.PredictedStatusFlowService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.transform.OutputKeys;
import java.util.List;

@CrossOrigin
@RequestMapping("/api/statusFlow")
@RestController
public class PredictedStatusFlowController {

    private final PredictedStatusFlowService predictedStatusFlowService;

    public PredictedStatusFlowController(PredictedStatusFlowService predictedStatusFlowService) {
        this.predictedStatusFlowService = predictedStatusFlowService;
    }
    @GetMapping
    public ResponseEntity<List<PredictedStatusFlowResponse>> getAll(){
        List<PredictedStatusFlowResponse> predictedStatusFlows = predictedStatusFlowService.getAllResponse();
        return        ResponseEntity.status(HttpStatus.OK).body(predictedStatusFlows);
    }

    @PostMapping
    public ResponseEntity<PredictedStatusFlowResponse> add(@RequestBody PredictedStatusFlowRequest predictedStatusFlowRequest){
        PredictedStatusFlowResponse response = predictedStatusFlowService.add(predictedStatusFlowRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @PatchMapping("/{id}/status")
    public ResponseEntity<PredictedStatusFlowResponse> addStatuses(@RequestBody PredictedStatusFlowRequest predictedStatusFlowRequest, @PathVariable Long id){
        if (predictedStatusFlowRequest.getStatuses() != null || !predictedStatusFlowRequest.getStatuses().isEmpty()){
         PredictedStatusFlow predictedStatusFlow =   predictedStatusFlowService.addStatuses(id,predictedStatusFlowRequest.getStatuses());
         PredictedStatusFlowResponse response = predictedStatusFlowService.convertToResponse(predictedStatusFlow);
         return ResponseEntity.status(HttpStatus.OK).body(response);
        }
       return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new PredictedStatusFlowResponse());

    }
}
