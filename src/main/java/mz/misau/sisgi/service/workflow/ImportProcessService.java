package mz.misau.sisgi.service.workflow;

import mz.misau.sisgi.auth.JwtUtil;
import mz.misau.sisgi.comunication.EmailService;
import mz.misau.sisgi.comunication.NotificationRepository;
import mz.misau.sisgi.dto.workflow.*;
import mz.misau.sisgi.entity.Currency;
import mz.misau.sisgi.entity.workflow.*;
import mz.misau.sisgi.repository.workflow.*;
import org.springframework.beans.BeanUtils;
import org.springframework.cglib.core.Local;
import org.springframework.context.annotation.Import;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
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

    private CurrencyService currencyService;

    public ImportProcessService(WorkflowTaskRepository workflowTaskRepository, PredictedStatusFlowRepository predictedStatusFlowRepository, EmailService emailService, NotificationRepository notificationRepository, NotifiableRepository notifiableRepository,CurrencyService currencyService,LogProcessStatusService logService,  JwtUtil jwtUtil, ImportProcessRepository importProcessRepository, BeneficiaryRepository beneficiaryRepository, ForwardingAgentRepository forwardingAgentRepository, FinancierRepository financierRepository, GoodsRepository goodsRepository) {
        super(workflowTaskRepository, predictedStatusFlowRepository, emailService, notificationRepository, notifiableRepository,logService, jwtUtil);
        this.importProcessRepository = importProcessRepository;
        this.beneficiaryRepository = beneficiaryRepository;
        this.forwardingAgentRepository = forwardingAgentRepository;
        this.predictedStatusFlowRepository = predictedStatusFlowRepository;
        this.financierRepository = financierRepository;
        this.goodsRepository = goodsRepository;
        this.currencyService = currencyService;
    }

    private static void setNotifiableResponse(ImportProcess importProcess, ImportProcessResponse importProcessResponse) {
        List<NotifiableResponse> notifiableResponses = new ArrayList<>();

        if (importProcess.getNotifiables() == null) return;
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

        if(importProcessRequest.getCurrencyId() != null){
            Currency currency = currencyService.getById(importProcessRequest.getCurrencyId());
            System.out.println(currency);
            importProcess.setCurrency(currency);
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

        setCurrencyResponse(importProcess, importProcessResponse);

        String currentStatus = getCurrentStatusName(importProcess);
        importProcessResponse.setCurrentStatus(currentStatus);
        return importProcessResponse;
    }

    private static void setCurrencyResponse(ImportProcess importProcess, ImportProcessResponse importProcessResponse) {
        Currency currency= importProcess.getCurrency();
        CurrencyResponse currencyResponse = new CurrencyResponse();

        if(currency != null){
            BeanUtils.copyProperties(currency, currencyResponse);

            importProcessResponse.setCurrencyResponse(currencyResponse);
        }


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

    public ImportProcess findById(Long id) {
        return importProcessRepository.findById(id).get();

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

    public ImportProcessTotalsReport countProcessGroupByStatus() {

        return importProcessRepository.countProcessGroupByStatus();
    }

    public List<BeneficiaryProcessReport> totalByBeneficiary() {
        return importProcessRepository.totalByBeneficiary();
    }

    public List<FunderTotalReport> totalByFunder() {
        return importProcessRepository.totalByFunder();
    }

    public List<ImportProcess> expiresIn(LocalDate startDate,LocalDate endDate) {
        Date beforeDate = Date.valueOf(endDate);
        return importProcessRepository.expiredBefore(beforeDate).stream().filter(process -> {

            LocalDate startLocalDate = LocalDate.ofInstant(process.getStartDate().toInstant(), ZoneId.systemDefault());
            LocalDate plusDays = startLocalDate.plusDays(process.getPredictedStatusFlow().getDaysToCompleteTotal());
            return plusDays.isAfter(startDate) && plusDays.isBefore(endDate);
        }).collect(Collectors.toList());
    }



    public List<ImportProcessResponse> getThatExpires(LocalDate startDate, LocalDate endDate) {

        List<ImportProcess> processes = expiresIn(startDate, endDate);
        List<ImportProcessResponse> responses = processes.stream().map(process -> convertToResponse(process)).collect(Collectors.toList());
        return responses;

    }
}
