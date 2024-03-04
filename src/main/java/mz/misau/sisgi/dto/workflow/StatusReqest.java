package mz.misau.sisgi.dto.workflow;

import lombok.Data;

@Data
public class StatusReqest {
    private Long id;
    private int days;
    private String nameStatus;
}
