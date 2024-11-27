package com.example.currencyconverter.controler;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.currencyconverter.service.CurrencyConversionService;


@RestController
public class CurrencyController {

    @Autowired
    private CurrencyConversionService currencyConversionService;

    @GetMapping("/currencies")
    public Map<String, Double> getAvailableCurrencies() {
        return currencyConversionService.getAllExchangeRates();
    }
}