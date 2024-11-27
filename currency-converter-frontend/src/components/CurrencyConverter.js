import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CurrencyConverter() {
    const [currencies, setCurrencies] = useState([]); // List of currency codes
    const [rates, setRates] = useState({}); // Currency rates from the API
    const [fromCurrency, setFromCurrency] = useState('USD'); // Default from currency
    const [toCurrency, setToCurrency] = useState('EUR'); // Default to currency
    const [amount, setAmount] = useState(1); // Amount to convert
    const [convertedAmount, setConvertedAmount] = useState(null); // Conversion result

    // Fetch currency rates
    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/currencies');
                setRates(response.data);
                setCurrencies(Object.keys(response.data)); // Extract currency codes
            } catch (error) {
                console.error('Error fetching currencies:', error.message);
            }
        };

        fetchCurrencies();
    }, []);

    // Handle conversion logic
    const handleConvert = () => {
        if (rates[fromCurrency] && rates[toCurrency]) {
            const rate = rates[toCurrency] / rates[fromCurrency];
            setConvertedAmount(amount * rate);
        } else {
            setConvertedAmount(null);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Currency Converter</h1>

            {/* Amount Input */}
            <div style={{ marginBottom: '20px' }}>
                <label>
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{ marginLeft: '10px', padding: '5px', width: '100px', color:'black' }}
                    />
                </label>
            </div>

            {/* From Currency Dropdown */}
            <div style={{ marginBottom: '20px' }}>
                <label>
                    From:
                    <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        style={{ marginLeft: '10px', padding: '5px',  color:'black' }}
                    >
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {/* To Currency Dropdown */}
            <div style={{ marginBottom: '20px' }}>
                <label>
                    To:
                    <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        style={{ marginLeft: '10px', padding: '5px',  color:'black' }}
                    >
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {/* Convert Button */}
            <button
                onClick={handleConvert}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#0070f3',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Convert
            </button>

            {/* Display Converted Amount */}
            {convertedAmount !== null && (
                <h2 style={{ marginTop: '20px' }}>
                    {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
                </h2>
            )}
        </div>
    );
}
