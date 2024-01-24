package mz.misau.sisgi.repository.workflow;

import mz.misau.sisgi.entity.workflow.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
