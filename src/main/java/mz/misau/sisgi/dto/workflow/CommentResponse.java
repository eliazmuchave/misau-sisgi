package mz.misau.sisgi.dto.workflow;

import lombok.Data;

import java.util.Date;

@Data
public class CommentResponse {
    private String text;
    private String user;
    private Date created;
    private Long processId;
}
