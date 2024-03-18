package mz.misau.sisgi.dto.workflow;

import lombok.Data;

import java.util.Date;

@Data

public class CurrencyResponse {

    private Long id;
    private Date created;
    private Date updated;
    private String symbol;
    private String name;
}
