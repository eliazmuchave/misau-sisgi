package mz.misau.sisgi.controller.workflow;

import mz.misau.sisgi.dto.workflow.CommentRequest;
import mz.misau.sisgi.dto.workflow.CommentResponse;
import mz.misau.sisgi.entity.workflow.Comment;
import mz.misau.sisgi.entity.workflow.ImportProcess;
import mz.misau.sisgi.service.workflow.CommentService;
import mz.misau.sisgi.service.workflow.ImportProcessService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private CommentService commentService;
    private ImportProcessService importProcessService;

    public CommentController(CommentService commentService, ImportProcessService importProcessService) {
        this.commentService = commentService;
        this.importProcessService = importProcessService;
    }

    @GetMapping("/importProcess/{processId}")
    public ResponseEntity<List<CommentResponse>> getCommentsOfProcess(@PathVariable Long processId) {

        try {
            List<CommentResponse> comments = commentService.getCommentsOfProcessId(processId);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {

        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/importProcess/{processId}")
    public ResponseEntity<CommentResponse> addComment(@RequestBody CommentRequest commentRequest, @PathVariable Long processId) {



        try {
            Comment comment = new Comment();

            BeanUtils.copyProperties(commentRequest, comment);
            ImportProcess importProcess = importProcessService.findById(processId);
            Comment addedComment = commentService.addNewComment(comment, importProcess);
            return ResponseEntity.ok(commentService.convertToResponse(addedComment));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
