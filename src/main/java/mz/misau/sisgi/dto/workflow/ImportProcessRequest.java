package mz.misau.sisgi.dto.workflow;

import lombok.Data;

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
    private Long statusFlowId;

    private Long forwardingAgentId;

    private Long goodsId;

    private Long beneficiaryId;

    private Long financiaryId;
}

