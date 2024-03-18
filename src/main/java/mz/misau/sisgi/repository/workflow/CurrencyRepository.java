package mz.misau.sisgi.repository.workflow;

import mz.misau.sisgi.entity.Currency;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurrencyRepository  extends JpaRepository<Currency, Long> {
}
