package mz.misau.sisgi.controller.workflow;

import mz.misau.sisgi.entity.workflow.Beneficiary;
import mz.misau.sisgi.repository.workflow.BeneficiaryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/beneficiaries")
public class BeneficiaryController {

    private final BeneficiaryRepository beneficiaryRepository;

    public BeneficiaryController(BeneficiaryRepository beneficiaryRepository) {
        this.beneficiaryRepository = beneficiaryRepository;
    }

    @GetMapping
    public List<Beneficiary> getAll(){

        return beneficiaryRepository.findAll();
    }
    @PostMapping
    public Beneficiary addNew(@RequestBody Beneficiary beneficiary){
        return  beneficiaryRepository.save(beneficiary);
    }

    @PatchMapping("/{id}")
    public Beneficiary updateBeneficiary(@PathVariable Long id){
        Beneficiary beneficiary = beneficiaryRepository.findById(id).orElse(new Beneficiary());
        beneficiaryRepository.save(beneficiary);
        return beneficiary;
    }
}
