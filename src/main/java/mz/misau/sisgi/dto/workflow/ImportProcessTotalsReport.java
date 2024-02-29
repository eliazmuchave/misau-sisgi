package mz.misau.sisgi.dto.workflow;

import lombok.Data;

import java.util.Date;

@Data
public class ImportProcessTotalsReport {

    public ImportProcessTotalsReport(long inProgress,long done, long closed){
        this.closed = closed;
        this.done = done;
        this.inProgress = inProgress;
        this.date = new Date();
    }

    private long inProgress;
    private long closed;
    private long done;
    private Date date = new Date();
}
