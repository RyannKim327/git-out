// Define types for our Android-like environment
interface AsyncTaskCallbacks<T> {
    onPreExecute?(): void;
    doInBackground(): T;
    onPostExecute?(result: T): void;
    onProgressUpdate?(...values: number[]): void;
}

// Mock Android AsyncTask implementation
class AsyncTask<T> {
    private isCancelled = false;

    execute(...params: any[]): void {
        // Simulate Android's background thread execution
        setTimeout(() => {
            this.onPreExecute();
            
            // Run in background (simulated)
            setTimeout(() => {
                if (!this.isCancelled) {
                    const result = this.doInBackground();
                    // Back to main thread (simulated)
                    setTimeout(() => {
                        this.onPostExecute(result);
                    }, 0);
                }
            }, 0);
        }, 0);
    }

    cancel(): void {
        this.isCancelled = true;
    }

    // Default implementations that can be overridden
    protected onPreExecute(): void {}
    protected abstract doInBackground(): T;
    protected onPostExecute(result: T): void {}
    protected publishProgress(...progress: number[]): void {
        // Simulate progress updates
        this.onProgressUpdate?.(...progress);
    }
    protected onProgressUpdate?(...progress: number[]): void;
}

// Example: Network connection task
interface ConnectionResult {
    success: boolean;
    data?: string;
    error?: string;
}

class NetworkConnectionTask extends AsyncTask<ConnectionResult> {
    private url: string;
    private timeout: number;

    constructor(url: string, timeout: number = 5000) {
        super();
        this.url = url;
        this.timeout = timeout;
    }

    protected onPreExecute(): void {
        console.log('Starting network connection...');
        // Simulate UI updates (like showing loading indicator)
    }

    protected doInBackground(): ConnectionResult {
        console.log('Connecting to:', this.url);
        
        // Simulate network delay
        const startTime = Date.now();
        while (Date.now() - startTime < 2000) {
            // Busy wait to simulate network work
        }

        // Simulate random success/failure
        const isSuccess = Math.random() > 0.3;
        
        if (isSuccess) {
            this.publishProgress(100);
            return {
                success: true,
                data: `Connected successfully to ${this.url}`
            };
        } else {
            return {
                success: false,
                error: 'Connection timeout'
            };
        }
    }

    protected onPostExecute(result: ConnectionResult): void {
        if (result.success) {
            console.log('✅ Connection successful:', result.data);
            // Handle successful connection
        } else {
            console.log('❌ Connection failed:', result.error);
            // Handle connection error
        }
    }

    protected onProgressUpdate(progress: number): void {
        console.log(`Connection progress: ${progress}%`);
    }
}

// Example: Database query task
class DatabaseQueryTask extends AsyncTask<string[]> {
    private query: string;

    constructor(query: string) {
        super();
        this.query = query;
    }

    protected doInBackground(): string[] {
        console.log('Executing database query:', this.query);
        
        // Simulate database operation
        const results: string[] = [];
        for (let i = 0; i < 5; i++) {
            results.push(`Result ${i + 1} for: ${this.query}`);
            this.publishProgress((i + 1) * 20); // 20%, 40%, 60%, 80%, 100%
            
            // Simulate work delay
            const startTime = Date.now();
            while (Date.now() - startTime < 500) {
                // Busy wait
            }
        }
        
        return results;
    }

    protected onPostExecute(results: string[]): void {
        console.log('Database query completed. Results:', results);
    }

    protected onProgressUpdate(progress: number): void {
        console.log(`Query progress: ${progress}%`);
    }
}

// Usage examples
function demonstrateAsyncTasks(): void {
    console.log('=== Network Connection Example ===');
    const networkTask = new NetworkConnectionTask('https://api.example.com/data');
    networkTask.execute();

    // Wait a bit before starting next example
    setTimeout(() => {
        console.log('\n=== Database Query Example ===');
        const dbTask = new DatabaseQueryTask('SELECT * FROM users');
        dbTask.execute();
    }, 3000);
}

// Alternative: Using Promises for modern async handling
class PromiseBasedAsyncTask {
    static async executeNetworkCall(url: string): Promise<ConnectionResult> {
        console.log('Starting promise-based network call...');
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const isSuccess = Math.random() > 0.3;
                if (isSuccess) {
                    resolve({
                        success: true,
                        data: `Connected to ${url}`
                    });
                } else {
                    resolve({
                        success: false,
                        error: 'Network error'
                    });
                }
            }, 2000);
        });
    }
}

// Modern usage with async/await
async function modernAsyncExample(): Promise<void> {
    console.log('\n=== Modern Async/Await Example ===');
    
    try {
        const result = await PromiseBasedAsyncTask.executeNetworkCall('https://api.example.com');
        if (result.success) {
            console.log('Modern approach success:', result.data);
        } else {
            console.log('Modern approach failed:', result.error);
        }
    } catch (error) {
        console.log('Modern approach error:', error);
    }
}

// Run demonstrations
demonstrateAsyncTasks();

// Run modern example after a delay
setTimeout(() => {
    modernAsyncExample();
}, 6000);
