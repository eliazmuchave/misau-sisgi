package mz.misau.sisgi.schedule;

import mz.misau.sisgi.comunication.EmailService;
import mz.misau.sisgi.comunication.Notification;
import mz.misau.sisgi.comunication.NotificationRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class NotificationScheduler {

    private final EmailService emailService;
    private final NotificationRepository notificationRepository;

    public NotificationScheduler(EmailService emailService, NotificationRepository notificationRepository) {
        this.emailService = emailService;
        this.notificationRepository = notificationRepository;
    }

    @Scheduled(fixedRate = 1000*30)
    public void sendUserCredentials(){
        Notification notification = notificationRepository.findFirstBySentFalse();
        emailService.sendMessage(notification);

    }
}
