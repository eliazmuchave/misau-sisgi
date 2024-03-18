package mz.misau.sisgi.controller.workflow;

import mz.misau.sisgi.dto.workflow.CurrencyRequest;
import mz.misau.sisgi.dto.workflow.CurrencyResponse;
import mz.misau.sisgi.entity.Currency;
import mz.misau.sisgi.service.workflow.CurrencyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/currencies")
public class CurrencyController {

    private CurrencyService currencyService;
    public CurrencyController(CurrencyService currencyService){
        this.currencyService = currencyService;
    }

    @GetMapping
    public ResponseEntity<List<CurrencyResponse>> getCurrency(){

        try{
            List<CurrencyResponse> responses = currencyService.getAllResponses();
            return ResponseEntity.status(HttpStatus.OK).body(responses);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }

    }

    @PostMapping
    public ResponseEntity<CurrencyResponse> add(@RequestBody  CurrencyRequest request){

        try {
            Currency currency = currencyService.addNewFromRequest(request);
            return ResponseEntity.ok(currencyService.convertToResponse(currency));
        }catch (Exception e){
          return ResponseEntity.badRequest().build();
        }
    }
}
