package mz.misau.sisgi.dto.workflow;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class PredictedStatusFlowResponse {
    private Long id;
    private String name;

    private List<Long> statuses;
    private Date created;
    private Date updated;
}
