package mz.misau.sisgi.repository.workflow;

import mz.misau.sisgi.entity.workflow.WorkflowTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface workflowTaskRepository extends JpaRepository<WorkflowTask, Long> {
}
