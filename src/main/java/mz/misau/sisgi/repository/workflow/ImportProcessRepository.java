package mz.misau.sisgi.repository.workflow;


import mz.misau.sisgi.entity.workflow.ImportProcess;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImportProcessRepository extends JpaRepository<ImportProcess, Long> {
}
