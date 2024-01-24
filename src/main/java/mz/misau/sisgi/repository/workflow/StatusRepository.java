package mz.misau.sisgi.repository.workflow;

import mz.misau.sisgi.entity.workflow.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Long> {
}
