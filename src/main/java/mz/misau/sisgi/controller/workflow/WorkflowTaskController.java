package mz.misau.sisgi.controller.workflow;

import mz.misau.sisgi.dto.workflow.WorkflowTaskRequest;
import mz.misau.sisgi.dto.workflow.WorkflowTaskResponse;
import mz.misau.sisgi.entity.workflow.WorkflowTask;
import mz.misau.sisgi.service.workflow.WorkflowTaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/workflowTask")
public class WorkflowTaskController {

    private final WorkflowTaskService workflowTaskService;

    public WorkflowTaskController(WorkflowTaskService workflowTaskService) {
        this.workflowTaskService = workflowTaskService;
    }

    @GetMapping
    public ResponseEntity<List<WorkflowTaskResponse>> getAll() {
        try {
            List<WorkflowTaskResponse> responses = workflowTaskService.getAllResponses();
            return ResponseEntity.status(HttpStatus.OK).body(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ArrayList<>());
        }
    }

    @PostMapping
    public ResponseEntity<WorkflowTaskResponse> add(@RequestBody WorkflowTaskRequest workflowTaskRequest){
        WorkflowTaskResponse response = workflowTaskService.add(workflowTaskRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }
}
