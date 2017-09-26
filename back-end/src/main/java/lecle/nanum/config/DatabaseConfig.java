package lecle.nanum.config;

import org.flywaydb.core.Flyway;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationInitializer;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

//import org.springframework.data.web.config.EnableSpringDataWebSupport;

@Configuration
@EntityScan(basePackages = {"lecle.nanum.entity"})
@EnableJpaRepositories(basePackages = {"lecle.nanum.repository"})
@EnableTransactionManagement(proxyTargetClass = true)
//@EnableSpringDataWebSupport
public class DatabaseConfig {

    /**
     * Override default flyway initializer to do nothing
     */
    @Bean @ConditionalOnProperty(value = "flyway.enabled", havingValue = "true")
    public FlywayMigrationInitializer flywayInitializer(Flyway flyway) {
        return new FlywayMigrationInitializer(flyway, new FlywayMigrationStrategy() {
            @Override
            public void migrate(Flyway flyway) {
                // do nothing
            }
        });
    }


    /**
     * Create a second flyway initializer to run after jpa has created the schema
     */
    @Bean @ConditionalOnProperty(value = "flyway.enabled", havingValue = "true")
    @DependsOn("entityManagerFactory")
    public FlywayMigrationInitializer delayedFlywayInitializer(Flyway flyway) {
        return new FlywayMigrationInitializer(flyway);
    }
}
