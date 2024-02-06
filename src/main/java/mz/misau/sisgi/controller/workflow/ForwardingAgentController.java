package mz.misau.sisgi.controller.workflow;

import mz.misau.sisgi.entity.workflow.ForwardingAgent;
import mz.misau.sisgi.repository.workflow.ForwardingAgentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/forwardingAgents")
public class ForwardingAgentController {
    private final ForwardingAgentRepository forwardingAgentRepository;

    public ForwardingAgentController(ForwardingAgentRepository forwardingAgentRepository) {
        this.forwardingAgentRepository = forwardingAgentRepository;
    }

    @GetMapping
    public List<ForwardingAgent> getAll(){
        return forwardingAgentRepository.findAll();
    }

    @PostMapping
    public ForwardingAgent addNew (@RequestBody ForwardingAgent forwardingAgent){
        ForwardingAgent agentAdded = forwardingAgentRepository.save(forwardingAgent);
        return agentAdded;
    }
}
