// apiService.ts
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

class ApiService {
  private baseUrl: string = 'https://jsonplaceholder.typicode.com';

  // Generic async GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: T = await response.json();
      
      return {
        data,
        status: response.status,
      };
    } catch (error) {
      console.error('GET Request failed:', error);
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }

  // Generic async POST request
  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: T = await response.json();
      
      return {
        data,
        status: response.status,
      };
    } catch (error) {
      console.error('POST Request failed:', error);
      throw new Error(`Failed to post data: ${error.message}`);
    }
  }
}

// Usage example in a React Native component
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';

const apiService = new ApiService();

const UserComponent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async (userId: number): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.get<User>(`/users/${userId}`);
      setUser(response.data);
      
    } catch (err) {
      setError(err.message);
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: Partial<User>): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.post<User>('/users', userData);
      setUser(response.data);
      
    } catch (err) {
      setError(err.message);
      console.error('Error creating user:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial user data
    fetchUser(1);
  }, []);

  if (loading) {
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
        <Button title="Retry" onPress={() => fetchUser(1)} />
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      {user ? (
        <>
          <Text>User ID: {user.id}</Text>
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
        </>
      ) : (
        <Text>No user data</Text>
      )}
      
      <Button
        title="Create New User"
        onPress={() => createUser({
          name: 'John Doe',
          email: 'john@example.com'
        })}
      />
    </View>
  );
};

export default UserComponent;
