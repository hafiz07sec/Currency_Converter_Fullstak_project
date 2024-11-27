package com.example.currencyconverter.config;


import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public Caffeine<Object, Object> caffeineConfig() {
        return Caffeine.newBuilder()
                .initialCapacity(100)       // Initial number of cache entries
                .maximumSize(500)           // Maximum number of cache entries
                .expireAfterWrite(1, TimeUnit.HOURS) // Expire after 1 hour
                .recordStats();             // Enable cache statistics
    }
}
