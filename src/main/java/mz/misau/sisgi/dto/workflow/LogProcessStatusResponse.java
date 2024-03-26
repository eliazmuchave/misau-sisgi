package mz.misau.sisgi.dto.workflow;

import lombok.Data;

import java.util.Date;

@Data
public class LogProcessStatusResponse {
    private Long id;
    private String status;
    private Date created;
    private Date startDate;
    private Date endDate;
    private int expectedDays;
}
