import { useEffect } from 'react';
import axios from 'axios';

export default function CurrencyFetcher() {
    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                // Fetch the API data
                console.log('Fetching currencies...');
                const response = await axios.get('http://localhost:8080/currencies');
                console.log('Currency Data:', response.data);
                
                // Log the data
                console.log('Currency Data:', response.data);
            } catch (error) {
                console.error('Error fetching currencies:', error.message);
            }
        };

        fetchCurrencies();
    }, []);

    return (
        <div>
            <h1>Fetching Currency Data...</h1>
        </div>
    );
}
