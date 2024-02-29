package mz.misau.sisgi.service.workflow;

import mz.misau.sisgi.auth.JwtUtil;
import mz.misau.sisgi.comunication.EmailService;
import mz.misau.sisgi.comunication.NotificationRepository;
import mz.misau.sisgi.dto.workflow.*;
import mz.misau.sisgi.entity.workflow.*;
import mz.misau.sisgi.repository.workflow.*;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ImportProcessService extends WorkflowTaskService {
    private final ImportProcessRepository importProcessRepository;
    private final BeneficiaryRepository beneficiaryRepository;
    private final ForwardingAgentRepository forwardingAgentRepository;

    private final PredictedStatusFlowRepository predictedStatusFlowRepository;

    private final FinancierRepository financierRepository;
    private final GoodsRepository goodsRepository;

    public ImportProcessService(WorkflowTaskRepository workflowTaskRepository, PredictedStatusFlowRepository predictedStatusFlowRepository, EmailService emailService, NotificationRepository notificationRepository, NotifiableRepository notifiableRepository, JwtUtil jwtUtil, ImportProcessRepository importProcessRepository, BeneficiaryRepository beneficiaryRepository, ForwardingAgentRepository forwardingAgentRepository, FinancierRepository financierRepository, GoodsRepository goodsRepository) {
        super(workflowTaskRepository, predictedStatusFlowRepository, emailService, notificationRepository, notifiableRepository, jwtUtil);
        this.importProcessRepository = importProcessRepository;
        this.beneficiaryRepository = beneficiaryRepository;
        this.forwardingAgentRepository = forwardingAgentRepository;
        this.predictedStatusFlowRepository = predictedStatusFlowRepository;
        this.financierRepository = financierRepository;
        this.goodsRepository = goodsRepository;
    }

    private static void setNotifiableResponse(ImportProcess importProcess, ImportProcessResponse importProcessResponse) {
        List<NotifiableResponse> notifiableResponses = new ArrayList<>();

        if (importProcess.getNotifiables() == null)
            return;
        importProcess.getNotifiables().stream().forEach(notifiable -> {
            NotifiableResponse notifiableResponse = new NotifiableResponse();
            BeanUtils.copyProperties(notifiable, notifiableResponse);
            notifiableResponses.add(notifiableResponse);
        });
        importProcessResponse.setNotifiables(notifiableResponses);
    }

    public ImportProcessResponse add(ImportProcessRequest importProcessRequest) {
        return add(importProcessRequest, new ImportProcess());
    }

    public ImportProcessResponse add(ImportProcessRequest importProcessRequest, ImportProcess importProcess) {

        BeanUtils.copyProperties(importProcessRequest, importProcess);


        if (importProcessRequest.getBeneficiaryId() != null) {
            Beneficiary beneficiary = beneficiaryRepository.findById(importProcessRequest.getBeneficiaryId()).get();
            importProcess.setBeneficiary(beneficiary);
        }

        if (importProcessRequest.getFinanciaryId() != null) {
            Financier financier = financierRepository.findById(importProcessRequest.getFinanciaryId()).get();
            importProcess.setFinancier(financier);

        }

        if (importProcessRequest.getGoodsId() != null) {
            Goods goods = goodsRepository.findById(importProcessRequest.getGoodsId()).get();
            importProcess.setGoods(goods);
        }

        if (importProcessRequest.getForwardingAgentId() != null) {
            ForwardingAgent forwardingAgent = forwardingAgentRepository.findById(importProcessRequest.getForwardingAgentId()).get();
            importProcess.setForwardingAgent(forwardingAgent);
        }

        if (importProcessRequest.getStatusFlowId() != null) {
            PredictedStatusFlow flow = predictedStatusFlowRepository.findById(importProcessRequest.getStatusFlowId()).get();
            importProcess.setPredictedStatusFlow(flow);
        }
        importProcessRepository.save(importProcess);
        return convertToResponse(importProcess);
    }

    private ImportProcessResponse convertToResponse(ImportProcess importProcess) {
        ImportProcessResponse importProcessResponse = new ImportProcessResponse();
        BeanUtils.copyProperties(importProcess, importProcessResponse);

        PredictedStatusFlowResponse predictedStatusFlowResponse = new PredictedStatusFlowResponse();
        BeanUtils.copyProperties(importProcess.getPredictedStatusFlow(), predictedStatusFlowResponse);
        importProcessResponse.setPredictedStatusFlow(predictedStatusFlowResponse);

        setNotifiableResponse(importProcess, importProcessResponse);

        String currentStatus = getCurrentStatusName(importProcess);
        importProcessResponse.setCurrentStatus(currentStatus);
        return importProcessResponse;
    }

    public List<ImportProcess> getAllProcess() {
        return importProcessRepository.findAll();
    }

    public List<ImportProcessResponse> getAllResponse() {
        List<ImportProcess> all = getAllProcess();
        List<ImportProcessResponse> responses = all.stream().map(process -> convertToResponse(process)).collect(Collectors.toList());
        return responses;
    }

    public ImportProcessResponse getProcessById(Long id) {
        ImportProcess importProcess = importProcessRepository.findById(id).get();
        return convertToResponse(importProcess);

    }

    public ImportProcessResponse update(ImportProcessRequest importProcessRequest, Long id) {

        ImportProcess importProcess = importProcessRepository.findById(id).get();
        return add(importProcessRequest, importProcess);

    }

    public ImportProcessResponse updateArrivalAndPickupDate(ArrivalAndPickupDateRequest arrivalAndPickupDateRequest) {
        Long id = arrivalAndPickupDateRequest.getId();
        ImportProcess process = null;
        if (id != null) {
            try {
                process = importProcessRepository.findById(id).get();
                if (arrivalAndPickupDateRequest.getArrivalDate() != null) {
                    process.setArrivalDate(arrivalAndPickupDateRequest.getArrivalDate());
                }

                if (arrivalAndPickupDateRequest.getPickupDate() != null) {
                    process.setPickupDate(arrivalAndPickupDateRequest.getPickupDate());
                }


            } catch (NullPointerException e) {

            }

        }

        importProcessRepository.save(process);

        return convertToResponse(process);
    }

    public ImportProcessResponse subscribeStatusChange(Long id, String token) {
        notifyStatusChange(id, token);
        ImportProcess importProcess = importProcessRepository.findById(id).orElseThrow();
        return convertToResponse(importProcess);
    }

    public ImportProcessResponse forwardImportStatus(Long id) {
        forwardStatus(id);
        ImportProcess importProcess = importProcessRepository.findById(id).orElseThrow();
        return convertToResponse(importProcess);


    }


    public ImportProcessResponse closeProcess(Long id) {

        ImportProcess importProcess = importProcessRepository.findById(id).orElseThrow();
        importProcess.setClosed(true);
        importProcessRepository.save(importProcess);
        return convertToResponse(importProcess);


    }

   public ImportProcessTotalsReport countProcessGroupByStatus(){

        return importProcessRepository.countProcessGroupByStatus();
   }

   public List<BeneficiaryProcessReport> totalByBeneficiary(){
        return  importProcessRepository.totalByBeneficiary();
   }
   public List<FunderTotalReport> totalByFunder(){
        return  importProcessRepository.totalByFunder();
   }
}
