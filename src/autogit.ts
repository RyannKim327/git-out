// src/services/MyService.ts
export const fetchDataFromService = async (): Promise<string> => {
    try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.message; // Assuming the response has a message field
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
// src/components/MyComponent.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { fetchDataFromService } from '../services/MyService';

const MyComponent: React.FC = () => {
    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchDataFromService();
            setData(result);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleFetchData();
    }, []);

    return (
        <View>
            {loading && <ActivityIndicator />}
            {error && <Text>{error}</Text>}
            {data && <Text>{data}</Text>}
            <Button title="Fetch Data" onPress={handleFetchData} />
        </View>
    );
};

export default MyComponent;
npx react-native run-android
