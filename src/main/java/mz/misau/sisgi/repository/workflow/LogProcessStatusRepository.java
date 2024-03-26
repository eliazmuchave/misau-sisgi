package mz.misau.sisgi.repository.workflow;

import mz.misau.sisgi.dto.workflow.LogProcessStatusResponse;
import mz.misau.sisgi.entity.workflow.LogProcessStatus;
import mz.misau.sisgi.entity.workflow.WorkflowTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LogProcessStatusRepository extends JpaRepository<LogProcessStatus, Long> {
    List<LogProcessStatus> getByWorkflowTask(WorkflowTask workflowTask);

    @Query("SELECT logProcessStatus FROM LogProcessStatus  logProcessStatus Where logProcessStatus.workflowTask = :task order by logProcessStatus.startDate DESC limit 1")
     LogProcessStatus findFirstByOrderByStartDate(WorkflowTask task);
}
