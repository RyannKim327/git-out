import { Capacitor } from '@capacitor/core';
import { AndroidAsyncTask } from '@capacitor/android';

// Define interface for the async task result
interface AsyncTaskResult {
  success: boolean;
  data?: any;
  error?: string;
}

// Async task function that runs on Android
const performAsyncAndroidTask = async (): Promise<AsyncTaskResult> => {
  try {
    // Check if running on Android
    if (Capacitor.getPlatform() !== 'android') {
      return {
        success: false,
        error: 'This feature is only available on Android'
      };
    }

    // Execute async task on Android
    const result = await AndroidAsyncTask.execute({
      taskName: 'backgroundOperation',
      params: {
        url: 'https://api.example.com/data',
        timeout: 5000
      }
    });

    return {
      success: true,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Example usage
const fetchDataAsync = async () => {
  console.log('Starting async Android task...');
  
  const taskResult = await performAsyncAndroidTask();
  
  if (taskResult.success) {
    console.log('Async task completed:', taskResult.data);
    // Process the data
    return taskResult.data;
  } else {
    console.error('Async task failed:', taskResult.error);
    throw new Error(taskResult.error);
  }
};

// Additional Android-specific async task with callback
class AndroidNetworkTask {
  static async downloadFile(url: string, progressCallback?: (progress: number) => void): Promise<Blob> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await AndroidAsyncTask.execute({
          taskName: 'downloadFile',
          params: {
            url,
            progressCallback: progressCallback ? 'enabled' : 'disabled'
          }
        });

        if (progressCallback) {
          // Listen for progress events (would need native implementation)
          AndroidAsyncTask.addListener('downloadProgress', (data: { progress: number }) => {
            progressCallback(data.progress);
          });
        }

        resolve(result as Blob);
      } catch (error) {
        reject(error);
      }
    });
  }
}

// Example with progress updates
const downloadWithProgress = async () => {
  try {
    const file = await AndroidNetworkTask.downloadFile(
      'https://example.com/largefile.zip',
      (progress) => {
        console.log(`Download progress: ${progress}%`);
      }
    );
    console.log('Download completed:', file);
  } catch (error) {
    console.error('Download failed:', error);
  }
};

// Utility function to check Android availability
const isAndroidAsyncTaskAvailable = (): boolean {
  return Capacitor.isPluginAvailable('AndroidAsyncTask');
}

export { performAsyncAndroidTask, fetchDataAsync, AndroidNetworkTask, downloadWithProgress, isAndroidAsyncTaskAvailable };
// In your Android project
public class BackgroundOperationTask extends AsyncTask<Map<String, Object>, Void, Map<String, Object>> {
    
    @Override
    protected Map<String, Object> doInBackground(Map<String, Object>... params) {
        Map<String, Object> result = new HashMap<>();
        try {
            // Perform background operation
            String url = (String) params[0].get("url");
            int timeout = (int) params[0].get("timeout");
            
            // Your async logic here
            String response = fetchDataFromNetwork(url, timeout);
            
            result.put("success", true);
            result.put("data", response);
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", e.getMessage());
        }
        return result;
    }
}

// Register plugin in Capacitor
@CapacitorPlugin(name = "AndroidAsyncTask")
public class AndroidAsyncTaskPlugin extends Plugin {
    
    @PluginMethod
    public void execute(PluginCall call) {
        String taskName = call.getString("taskName");
        Map<String, Object> params = call.getObject("params");
        
        switch (taskName) {
            case "backgroundOperation":
                new BackgroundOperationTask().execute(params);
                break;
            case "downloadFile":
                // Handle file download
                break;
        }
    }
}
