package mz.misau.sisgi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SisgiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SisgiApplication.class, args);
	}

}
