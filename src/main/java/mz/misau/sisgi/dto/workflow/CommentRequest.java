package mz.misau.sisgi.dto.workflow;

import lombok.Data;
import mz.misau.sisgi.entity.BaseEntity;

import java.util.Date;

@Data

public class CommentRequest extends BaseEntity {
    
    private String text;
    private String user;
}
