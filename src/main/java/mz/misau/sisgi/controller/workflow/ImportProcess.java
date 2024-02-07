package mz.misau.sisgi.controller.workflow;

import jakarta.persistence.*;
import lombok.Data;
import mz.misau.sisgi.entity.workflow.*;

import java.util.Date;

@Entity
@Table(name = "import_process")
@Data
public class ImportProcess extends WorkflowTask {

    @Column(name = "numero_processo")
    private String numeroProcesso;

    @Column(name = "factura")
    private String factura;

    @Column(name = "valor")
    private Double valor;

    @Column(name = "moeda")
    private String moeda;

    @Column(name = "quantidade")
    private int quantidade;

    @Column(name = "previsao_chegada")
    private Date previsaoChegada;

    @Column(name = "data_chegada")
    private Date dataChegada;

    @Column(name = "data_levantamento")
    private Date dataLevantamento;

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
