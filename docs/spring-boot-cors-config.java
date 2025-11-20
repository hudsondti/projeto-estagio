// Exemplo de configuração CORS para Spring Boot
// Salve este arquivo como: src/main/java/com/exemplo/config/WebConfig.java

package com.exemplo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Permite CORS para todas as rotas que começam com /api
                .allowedOrigins("http://localhost:3000") // URL do seu frontend Next.js
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}

// Alternativa usando anotação @CrossOrigin nos controllers:
/*
 * @RestController
 * 
 * @RequestMapping("/api/internships")
 * 
 * @CrossOrigin(origins = "http://localhost:3000")
 * public class InternshipController {
 * // Seus endpoints aqui
 * }
 */