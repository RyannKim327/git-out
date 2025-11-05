interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Android-compatible async network request using TypeScript
async function fetchData(): Promise<void> {
  const API_URL = 'https://jsonplaceholder.typicode.com/posts/1';

  try {
    console.log('Starting async network request...');
    
    // Create an async task using promise-based fetch
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data: Post = await response.json();
    
    console.log('Async task completed successfully!');
    console.log('Received data:', data);
    
    // In a React Native app, you would typically update state here:
    // this.setState({ postData: data });
    
  } catch (error) {
    console.error('Error in async operation:', error.message);
    
    // Handle error (e.g., show alert in UI)
    // In React Native: Alert.alert('Network Error', error.message);
  }
}

// Execute the async task
fetchData().then(() => {
  console.log('Async operation finished');
});
