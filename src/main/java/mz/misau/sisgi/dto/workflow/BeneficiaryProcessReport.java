package mz.misau.sisgi.dto.workflow;

import lombok.Data;
import mz.misau.sisgi.entity.workflow.Beneficiary;

@Data
public class BeneficiaryProcessReport {
    public BeneficiaryProcessReport(String beneficiary, long total){
        this.beneficiary = beneficiary;
        this.total = total;
    }
    private String beneficiary;
    private long total;
}
