package mz.misau.sisgi.controller.workflow;

import mz.misau.sisgi.entity.workflow.Financier;
import mz.misau.sisgi.repository.workflow.FinancierRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/financiers")
public class FinancierController {
    private final FinancierRepository financierRepository;

    public FinancierController(FinancierRepository financierRepository) {
        this.financierRepository = financierRepository;
    }

    @GetMapping
    public List<Financier> getAll(){
        return financierRepository.findAll();
    }

    @PostMapping
    public Financier getById(@RequestBody Financier financier){
        return financierRepository.save(financier);
    }

    @PatchMapping("/{id}")
    public Financier getById(@PathVariable Long id){
        Financier financier = financierRepository.findById(id).orElse(new Financier());
        financierRepository.save(financier);
        return financier;
    }
}
