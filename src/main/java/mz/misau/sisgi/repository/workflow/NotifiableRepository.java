package mz.misau.sisgi.repository.workflow;

import mz.misau.sisgi.entity.workflow.Notifiable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotifiableRepository extends JpaRepository<Notifiable, Long> {
}
