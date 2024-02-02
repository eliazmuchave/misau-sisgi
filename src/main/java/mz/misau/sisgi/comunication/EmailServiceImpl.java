package mz.misau.sisgi.comunication;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component

public class EmailServiceImpl implements EmailService{
    private final NotificationRepository notificationRepository;

    private final JavaMailSender javaMailSender;

    public EmailServiceImpl(NotificationRepository notificationRepository, JavaMailSender javaMailSender) {
        this.notificationRepository = notificationRepository;
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void sendMessage(Notification notification) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("eliazardo.muchave.ac@gmail.com");
            message.setTo(notification.getDestination());
            message.setSubject(notification.getSubject());
            message.setText(notification.getText());
            javaMailSender.send(message);
            notification.setSent(true);
            notification.setSentSuccessfully(true);
            notificationRepository.save(notification);
        }catch (Exception e){
            notification.setSentSuccessfully(false);
            notification.setSent(true);
            notificationRepository.save(notification);
        }

    }

}
