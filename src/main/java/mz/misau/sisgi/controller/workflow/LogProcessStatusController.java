package mz.misau.sisgi.controller.workflow;

import mz.misau.sisgi.dto.workflow.LogProcessStatusResponse;
import mz.misau.sisgi.service.workflow.LogProcessStatusService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/logStatus")
public class LogProcessStatusController {

    private final LogProcessStatusService logProcessStatusService;

    public LogProcessStatusController(LogProcessStatusService logProcessStatusService) {
        this.logProcessStatusService = logProcessStatusService;
    }

    @GetMapping("/importProcess/{processId}")
    public ResponseEntity<List<LogProcessStatusResponse>> getLogByProcessId(@PathVariable Long processId) {

        List<LogProcessStatusResponse> response = logProcessStatusService.getLogByProcessId(processId);
        return ResponseEntity.ok(response);

    }
}
