package mz.misau.sisgi.entity.workflow;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "import_process")
@Data
public class ImportProcess extends WorkflowTask {

    @Column(name = "process_number")
    private String processNumber;

    @Column(name = "invoice")
    private String invoice;

    @Column(name = "value")
    private Double value;

    @Column(name = "currency")
    private String currency;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "arrival_forecast")
    private Date arrivalForecast;

    @Column(name = "arrival_date")
    private Date arrivalDate;

    @Column(name = "pickup_date")
    private Date pickupDate;

    @ManyToOne
    @JoinColumn(name = "forwarding_agent_id")
    private ForwardingAgent forwardingAgent;

    @ManyToOne
    @JoinColumn(name = "goods_id")
    private Goods goods;

    @ManyToOne
    @JoinColumn(name = "beneficiary_id")
    private Beneficiary beneficiary;

    @ManyToOne
    @JoinColumn(name = "financier_id")
    private Financier financier;
}
