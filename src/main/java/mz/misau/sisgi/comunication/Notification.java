package mz.misau.sisgi.comunication;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import mz.misau.sisgi.entity.BaseEntity;
@Entity
@Table(name = "notification")
@Data
public class Notification extends BaseEntity {
    @Column(name = "text")
    @NotBlank
    private String text;

    @Column(name = "destination")
    @NotBlank
    private String destination;

    @Column(name = "subject")
    @NotBlank
    private String subject;

    @Column(name = "sent")
    private boolean sent;

    @Column(name = "sent_successfully")
    private boolean sentSuccessfully;
}
