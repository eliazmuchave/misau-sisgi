package mz.misau.sisgi.dto.workflow;

import lombok.Data;

@Data
public class FunderTotalReport {

    public FunderTotalReport(String name, long total){
        this.name = name;
        this.total = total;
    }
    private String name;
    private long total;
}
