package mz.misau.sisgi.repository.workflow;

import mz.misau.sisgi.entity.workflow.PredictedStatusFlow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PredictedStatusFlowRepository extends JpaRepository<PredictedStatusFlow, Long> {
}
