// async-android-connection.ts
import { Plugins } from '@capacitor/core';

const { AndroidBridge } = Plugins;

interface AsyncTaskResult {
  success: boolean;
  data?: any;
  error?: string;
}

class AndroidAsyncConnector {
  
  // Method to execute async task on Android
  async executeAsyncTask(taskName: string, params: any): Promise<AsyncTaskResult> {
    try {
      const result = await AndroidBridge.executeAsyncTask({
        taskName: taskName,
        parameters: params
      });
      
      return {
        success: true,
        data: result.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Example: Fetch data from Android async task
  async fetchUserData(userId: string): Promise<AsyncTaskResult> {
    const params = {
      userId: userId,
      action: 'GET_USER_DATA'
    };

    return await this.executeAsyncTask('UserDataTask', params);
  }

  // Example: Send data to Android async task
  async uploadFile(fileData: string, fileName: string): Promise<AsyncTaskResult> {
    const params = {
      fileData: fileData,
      fileName: fileName,
      action: 'UPLOAD_FILE'
    };

    return await this.executeAsyncTask('FileUploadTask', params);
  }
}

// Usage example
const androidConnector = new AndroidAsyncConnector();

// Execute async task
androidConnector.fetchUserData('12345')
  .then(result => {
    if (result.success) {
      console.log('Data received:', result.data);
    } else {
      console.error('Error:', result.error);
    }
  });

androidConnector.uploadFile('base64DataHere', 'document.pdf')
  .then(result => {
    if (result.success) {
      console.log('Upload successful:', result.data);
    } else {
      console.error('Upload failed:', result.error);
    }
  });
// AndroidBridge.java (Capacitor plugin)
package com.example.plugin;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "AndroidBridge")
public class AndroidBridge extends Plugin {

    @PluginMethod
    public void executeAsyncTask(PluginCall call) {
        String taskName = call.getString("taskName");
        JSObject parameters = call.getObject("parameters");

        // Execute task on background thread
        new Thread(() -> {
            try {
                JSObject result = processTask(taskName, parameters);
                call.resolve(result);
            } catch (Exception e) {
                call.reject("Task failed: " + e.getMessage());
            }
        }).start();
    }

    private JSObject processTask(String taskName, JSObject parameters) {
        JSObject result = new JSObject();
        
        switch (taskName) {
            case "UserDataTask":
                String userId = parameters.getString("userId");
                // Perform async operation (database, network, etc.)
                String userData = fetchUserDataFromDatabase(userId);
                result.put("data", userData);
                break;
                
            case "FileUploadTask":
                String fileData = parameters.getString("fileData");
                String fileName = parameters.getString("fileName");
                // Perform file upload
                String uploadResult = uploadFileToServer(fileData, fileName);
                result.put("data", uploadResult);
                break;
                
            default:
                throw new RuntimeException("Unknown task: " + taskName);
        }
        
        return result;
    }

    private String fetchUserDataFromDatabase(String userId) {
        // Simulate async database operation
        try {
            Thread.sleep(1000); // Simulate network delay
            return "User data for " + userId;
        } catch (InterruptedException e) {
            throw new RuntimeException("Database operation failed");
        }
    }

    private String uploadFileToServer(String fileData, String fileName) {
        // Simulate file upload
        try {
            Thread.sleep(2000); // Simulate upload time
            return "File " + fileName + " uploaded successfully";
        } catch (InterruptedException e) {
            throw new RuntimeException("Upload failed");
        }
    }
}
{
  "dependencies": {
    "@capacitor/android": "^4.0.0",
    "@capacitor/core": "^4.0.0"
  }
}
