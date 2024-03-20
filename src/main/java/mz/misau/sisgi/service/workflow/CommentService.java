package mz.misau.sisgi.service.workflow;

import mz.misau.sisgi.dto.workflow.CommentResponse;
import mz.misau.sisgi.dto.workflow.ImportProcessResponse;
import mz.misau.sisgi.entity.workflow.Comment;
import mz.misau.sisgi.entity.workflow.ImportProcess;
import mz.misau.sisgi.repository.workflow.CommentRepository;
import mz.misau.sisgi.repository.workflow.ImportProcessRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Import;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {
    private CommentRepository commentRepository;
    private ImportProcessRepository importProcessRepository;

    private ImportProcessService importProcessService;

    public CommentService(CommentRepository commentRepository, ImportProcessRepository importProcessRepository, ImportProcessService importProcessService) {
        this.commentRepository = commentRepository;
        this.importProcessRepository = importProcessRepository;

        this.importProcessService = importProcessService;
    }

    public List<Comment> getCommentOfProcess(ImportProcess importProcess) {
        return commentRepository.getCommentsOfProcess(importProcess);
    }

    public List<CommentResponse> getCommentsOfProcessId(Long processId) {
        ImportProcess importProcess = importProcessRepository.findById(processId).orElseThrow();
        List<Comment> comments = getCommentOfProcess(importProcess);

        if (comments != null) {
            List<CommentResponse> responses = comments.stream().map(comment -> convertToResponse(comment)).collect(Collectors.toList());
            return responses;
        }
        return new ArrayList<>();
    }

    public CommentResponse convertToResponse(Comment comment) {

        CommentResponse commentResponse = new CommentResponse();
        commentResponse.setProcessId(comment.getImportProcess().getId());
        BeanUtils.copyProperties(comment, commentResponse);

        return commentResponse;

    }

    public Comment addNewComment(Comment comment, ImportProcess importProcess) {
        comment.setImportProcess(importProcess);
        return commentRepository.save(comment);
    }
}
