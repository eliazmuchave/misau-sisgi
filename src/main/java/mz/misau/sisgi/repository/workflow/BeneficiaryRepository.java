package mz.misau.sisgi.repository.workflow;

import mz.misau.sisgi.entity.workflow.Beneficiary;
import org.hibernate.validator.internal.engine.resolver.JPATraversableResolver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
}
