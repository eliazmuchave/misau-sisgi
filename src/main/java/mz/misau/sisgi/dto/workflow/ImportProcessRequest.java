package mz.misau.sisgi.dto.workflow;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import mz.misau.sisgi.entity.workflow.Beneficiary;
import mz.misau.sisgi.entity.workflow.Financier;
import mz.misau.sisgi.entity.workflow.ForwardingAgent;
import mz.misau.sisgi.entity.workflow.Goods;

import java.util.Date;

@Data
public class ImportProcessRequest {

    private String taskName;
    private Date startDate;
    private Date expectedEndDate;
    private String currentStatus;
    private String processNumber;

    private String invoice;

    private Double value;

    private String currency;

    private int quantity;

    private Date arrivalForecast;

    private Date arrivalDate;
    private Date pickupDate;
    private Long statusFlow;

    private Long forwardingAgentId;

    private Long goodsId;

    private Long beneficiaryId;

    private Long financierId;
}
