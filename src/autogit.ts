// Simulating Android AsyncTask-like functionality in TypeScript
class AsyncTask<T, Progress, Result> {
  private onPreExecuteCallback?: () => void;
  private onProgressUpdateCallback?: (progress: Progress) => void;
  private onPostExecuteCallback?: (result: Result) => void;
  private doInBackgroundCallback?: () => Promise<Result>;

  constructor() {
    this.execute = this.execute.bind(this);
  }

  // Set the background task
  doInBackground(task: () => Promise<Result>): this {
    this.doInBackgroundCallback = task;
    return this;
  }

  // Called before background task starts
  onPreExecute(callback: () => void): this {
    this.onPreExecuteCallback = callback;
    return this;
  }

  // Called when progress updates
  onProgressUpdate(callback: (progress: Progress) => void): this {
    this.onProgressUpdateCallback = callback;
    return this;
  }

  // Called when background task completes
  onPostExecute(callback: (result: Result) => void): this {
    this.onPostExecuteCallback = callback;
    return this;
  }

  // Execute the async task
  async execute(): Promise<Result | null> {
    if (!this.doInBackgroundCallback) {
      throw new Error('doInBackground must be set before executing');
    }

    try {
      // Pre-execute
      if (this.onPreExecuteCallback) {
        this.onPreExecuteCallback();
      }

      // Execute background task
      const result = await this.doInBackgroundCallback();

      // Post-execute
      if (this.onPostExecuteCallback) {
        this.onPostExecuteCallback(result);
      }

      return result;
    } catch (error) {
      console.error('AsyncTask failed:', error);
      return null;
    }
  }

  // Publish progress (call from doInBackground)
  protected publishProgress(progress: Progress): void {
    if (this.onProgressUpdateCallback) {
      this.onProgressUpdateCallback(progress);
    }
  }
}

// Example usage: Network API connection
interface ApiResponse {
  id: number;
  name: string;
  data: any;
}

class ApiService {
  private baseUrl = 'https://api.example.com';

  // Simulate API connection through async task
  async connectToApi(endpoint: string): Promise<ApiResponse | null> {
    const asyncTask = new AsyncTask<string, number, ApiResponse>()
      .doInBackground(() => this.fetchData(endpoint))
      .onPreExecute(() => {
        console.log('Starting API connection...');
        // Could update UI to show loading spinner
      })
      .onProgressUpdate((progress) => {
        console.log(`Connection progress: ${progress}%`);
        // Could update progress bar in UI
      })
      .onPostExecute((result) => {
        if (result) {
          console.log('API connection successful:', result);
        } else {
          console.log('API connection failed');
        }
        // Could hide loading spinner and show results
      });

    return await asyncTask.execute();
  }

  private async fetchData(endpoint: string): Promise<ApiResponse> {
    // Simulate network delay and progress
    const totalSteps = 5;
    let currentStep = 0;

    // Step 1: DNS resolution
    await this.delay(500);
    currentStep++;
    this.publishProgress((currentStep / totalSteps) * 100);

    // Step 2: Connection establishment
    await this.delay(300);
    currentStep++;
    this.publishProgress((currentStep / totalSteps) * 100);

    // Step 3: Request sending
    await this.delay(200);
    currentStep++;
    this.publishProgress((currentStep / totalSteps) * 100);

    // Step 4: Waiting for response
    await this.delay(800);
    currentStep++;
    this.publishProgress((currentStep / totalSteps) * 100);

    // Step 5: Receiving and parsing response
    await this.delay(400);
    currentStep++;
    this.publishProgress(100);

    // Simulate API response
    return {
      id: Date.now(),
      name: endpoint,
      data: { message: 'Success', timestamp: new Date().toISOString() }
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Method to publish progress from within the task
  private publishProgress(progress: number): void {
    // This would need to be called from within the AsyncTask context
    // In a real implementation, you'd use the task's publishProgress method
  }
}

// Database connection example
class DatabaseService {
  async connectToDatabase(): Promise<boolean> {
    const asyncTask = new AsyncTask<null, string, boolean>()
      .doInBackground(async () => {
        // Simulate database connection steps
        await this.connectToServer();
        await this.authenticate();
        await this.openDatabase();
        return true;
      })
      .onPreExecute(() => {
        console.log('Initializing database connection...');
      })
      .onProgressUpdate((progress) => {
        console.log(`Database progress: ${progress}`);
      })
      .onPostExecute((success) => {
        if (success) {
          console.log('Database connected successfully');
        } else {
          console.log('Database connection failed');
        }
      });

    return await asyncTask.execute() || false;
  }

  private async connectToServer(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  private async authenticate(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
  }

  private async openDatabase(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1200));
  }
}

// Usage example
async function demo() {
  console.log('=== API Connection Demo ===');
  const apiService = new ApiService();
  const response = await apiService.connectToApi('/users');
  console.log('Final result:', response);

  console.log('\n=== Database Connection Demo ===');
  const dbService = new DatabaseService();
  const dbConnected = await dbService.connectToDatabase();
  console.log('Database connected:', dbConnected);
}

// Run the demo
demo().catch(console.error);
