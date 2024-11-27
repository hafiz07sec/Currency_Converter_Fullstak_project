package com.example.currencyconverter.service;

import java.util.Map;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class ExchangeRateService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String apiUrl = "https://v6.exchangerate-api.com/v6/54a44670a3e16b45ebdf7dc0/latest";

    @Cacheable("exchangeRates")
    public Map<String, Object> getExchangeRates(String baseCurrency) {
        String url = String.format("%s/%s", apiUrl, baseCurrency);
        return restTemplate.getForObject(url, Map.class);
    }
}