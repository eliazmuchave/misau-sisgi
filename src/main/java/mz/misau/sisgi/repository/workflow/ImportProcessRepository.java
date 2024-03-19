package mz.misau.sisgi.repository.workflow;


import mz.misau.sisgi.dto.workflow.BeneficiaryProcessReport;
import mz.misau.sisgi.dto.workflow.FunderTotalReport;
import mz.misau.sisgi.dto.workflow.ImportProcessTotalsReport;
import mz.misau.sisgi.entity.workflow.ImportProcess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ImportProcessRepository extends JpaRepository<ImportProcess, Long> {

    @Query("""
            SELECT new mz.misau.sisgi.dto.workflow.ImportProcessTotalsReport( 
                        ( SELECT COUNT(id) From ImportProcess Where done = false and closed = false) AS inProgress, 
                        (SELECT Count(id) From ImportProcess Where done = true) AS  done, 
                       (SELECT COUNT(id) From ImportProcess Where closed = true) AS closed  )
            """)
    ImportProcessTotalsReport countProcessGroupByStatus();

    @Query("""
            SELECT new mz.misau.sisgi.dto.workflow.BeneficiaryProcessReport( 
            importProcess.beneficiary.name, Count(importProcess.id)) FROM  ImportProcess importProcess GROUP BY importProcess.beneficiary.name                         
            """)
    List<BeneficiaryProcessReport> totalByBeneficiary();

    @Query("""
            SELECT new mz.misau.sisgi.dto.workflow.FunderTotalReport( 
            importProcess.financier.name, Count(importProcess.id)) FROM  ImportProcess importProcess GROUP BY importProcess.financier.name                         
            """)
    List<FunderTotalReport> totalByFunder();

    @Query("""
                        SELECT importProces 
                        FROM ImportProcess importProces
                        WHERE  importProces.startDate <= :beforeDate
                        AND importProces.done = false
                        AND importProces.closed = false
            """)
    List<ImportProcess> expiredBefore(@Param("beforeDate") Date beforeDate);
}




