package mz.misau.sisgi.dto.workflow;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import mz.misau.sisgi.entity.workflow.Beneficiary;
import mz.misau.sisgi.entity.workflow.Financier;
import mz.misau.sisgi.entity.workflow.ForwardingAgent;
import mz.misau.sisgi.entity.workflow.Goods;

import java.util.Date;
import java.util.List;

@Data
public class ImportProcessResponse {
    private Long id;
    private String taskName;
    private Date startDate;
    private Date expectedEndDate;
    private Date created;
    private Date updated;
    private String currentStatus;
    private String processNumber;
    private String invoice;
    private Double value;
    private String currency;
    private int quantity;
    private Date arrivalForecast;
    private Date arrivalDate;
    private Date pickupDate;
    private boolean closed;
    private boolean done;
    private PredictedStatusFlowResponse predictedStatusFlow;
    private ForwardingAgent forwardingAgent;
    private Goods goods;
    private Beneficiary beneficiary;
    private Financier financier;
    private List<NotifiableResponse> notifiables;
}
