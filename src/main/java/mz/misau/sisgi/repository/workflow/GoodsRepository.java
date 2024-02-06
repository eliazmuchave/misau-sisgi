package mz.misau.sisgi.repository.workflow;

import mz.misau.sisgi.entity.workflow.Goods;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoodsRepository extends JpaRepository<Goods, Long> {
}
