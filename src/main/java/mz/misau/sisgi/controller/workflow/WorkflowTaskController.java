package mz.misau.sisgi.controller.workflow;

import mz.misau.sisgi.comunication.EmailService;
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
@RequestMapping("/api/tasks")
public class WorkflowTaskController {

    private final WorkflowTaskService workflowTaskService;
    private final EmailService emailService;

    public WorkflowTaskController(WorkflowTaskService workflowTaskService, EmailService emailService) {
        this.workflowTaskService = workflowTaskService;
        this.emailService = emailService;
    }

    @GetMapping
    public ResponseEntity<List<WorkflowTaskResponse>> getAll() {
        try {
            List<WorkflowTaskResponse> responses = workflowTaskService.getAllResponses();
            return ResponseEntity.status(HttpStatus.OK).body(responses);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ArrayList<>());
        }
    }

    @PostMapping
    public ResponseEntity<WorkflowTaskResponse> add(@RequestBody WorkflowTaskRequest workflowTaskRequest){
        WorkflowTaskResponse response = workflowTaskService.add(workflowTaskRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }
    @GetMapping("/{id}")
    public ResponseEntity<WorkflowTaskResponse> getById(@PathVariable Long id){
        WorkflowTaskResponse taskResponse = workflowTaskService.getById(id);
      return  ResponseEntity.status(HttpStatus.OK).body(taskResponse);
    }
}
