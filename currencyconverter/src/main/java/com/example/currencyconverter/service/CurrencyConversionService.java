package com.example.currencyconverter.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CurrencyConversionService {

    @Autowired
    private ExchangeRateService exchangeRateService;

    public Map<String, Double> getAllExchangeRates() {
        Map<String, Object> ratesData = exchangeRateService.getExchangeRates("USD");
        Map<String, Object> rawRates = (Map<String, Object>) ratesData.get("conversion_rates");

        Map<String, Double> convertedRates = new HashMap<>();
        for (Map.Entry<String, Object> entry : rawRates.entrySet()) {
            // Convert all values to Double
            convertedRates.put(entry.getKey(), ((Number) entry.getValue()).doubleValue());
        }
        return convertedRates;
    }
}