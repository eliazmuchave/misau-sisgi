package mz.misau.sisgi.repository.workflow;

import mz.misau.sisgi.entity.workflow.Comment;
import mz.misau.sisgi.entity.workflow.ImportProcess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("Select comment from Comment comment where comment.importProcess = :process order by comment.created desc ")
    List<Comment> getCommentsOfProcess(@Param("process") ImportProcess importProcess);
}
