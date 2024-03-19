package mz.misau.sisgi.service.workflow;

import mz.misau.sisgi.dto.workflow.CurrencyRequest;
import mz.misau.sisgi.dto.workflow.CurrencyResponse;
import mz.misau.sisgi.entity.Currency;
import mz.misau.sisgi.repository.workflow.CurrencyRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CurrencyService {
    private CurrencyRepository currencyRepository;
    public CurrencyService( CurrencyRepository currencyRepository){
        this.currencyRepository = currencyRepository;
    }

    public Currency addNewFromRequest(CurrencyRequest request){
        Currency currency = convertToCurrency(request);
        Currency saved =currencyRepository.save(currency);
        return saved;
    }

    public List<CurrencyResponse> getAllResponses(){
        List<Currency> currencies = currencyRepository.findAll();
        List<CurrencyResponse> responses = currencies.stream().map(currency -> convertToResponse(currency)).collect(Collectors.toList());
        return  responses;
    }

    public CurrencyResponse convertToResponse(Currency currency){
      CurrencyResponse response =   new CurrencyResponse();
        BeanUtils.copyProperties(currency, response);
        return  response;
    }

    public Currency convertToCurrency(CurrencyRequest request ){
        Currency currency = new Currency();
        BeanUtils.copyProperties(request, currency);
        return currency;
    }

    public Currency getById(Long currencyId) {

      Currency currency =  currencyRepository.findById(currencyId).orElseThrow();
      return currency;
    }
}
