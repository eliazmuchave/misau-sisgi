package mz.misau.sisgi.repository.workflow;

import mz.misau.sisgi.dto.workflow.LogProcessStatusResponse;
import mz.misau.sisgi.entity.workflow.LogProcessStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LogProcessStatusRepository extends JpaRepository<LogProcessStatus, Long> {
    List<LogProcessStatus> getByProcessId(Long processId);
}
