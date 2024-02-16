package mz.misau.sisgi.dto.workflow;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class ArrivalAndPickupDateRequest {

    @NotNull
    private Long id;

    @NotNull
    private Date arrivalDate;

    @NotNull
    private Date pickupDate;

}
