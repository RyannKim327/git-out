npm install @capacitor/core @capacitor/android
npm install --save-dev typescript
export interface ConnectionResult {
  success: boolean;
  data?: any;
  error?: string;
  statusCode?: number;
}

export interface NetworkTaskOptions {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: { [key: string]: string };
  body?: any;
  timeout?: number;
}
import { Plugins } from '@capacitor/core';
import { ConnectionResult, NetworkTaskOptions } from './types';

const { Network } = Plugins;

export class NetworkService {
  private static instance: NetworkService;

  private constructor() {}

  public static getInstance(): NetworkService {
    if (!NetworkService.instance) {
      NetworkService.instance = new NetworkService();
    }
    return NetworkService.instance;
  }

  /**
   * Execute an async network task
   */
  public async executeAsyncTask(options: NetworkTaskOptions): Promise<ConnectionResult> {
    try {
      // Check network connectivity first
      const status = await Network.getStatus();
      
      if (!status.connected) {
        return {
          success: false,
          error: 'No network connection',
          statusCode: 0
        };
      }

      // Simulate async network call (replace with actual implementation)
      const response = await this.mockNetworkCall(options);
      
      return {
        success: true,
        data: response,
        statusCode: 200
      };

    } catch (error) {
      return {
        success: false,
        error: error.message,
        statusCode: error.statusCode || 500
      };
    }
  }

  /**
   * Mock network call - Replace with actual HTTP implementation
   */
  private async mockNetworkCall(options: NetworkTaskOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        if (Math.random() > 0.2) { // 80% success rate for demo
          resolve({ message: 'Async task completed successfully', request: options });
        } else {
          reject(new Error('Network request failed'));
        }
      }, 2000); // 2 second delay
    });
  }

  /**
   * Example method to fetch data from API
   */
  public async fetchDataFromAPI(): Promise<ConnectionResult> {
    const options: NetworkTaskOptions = {
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    };

    return this.executeAsyncTask(options);
  }

  /**
   * Example method to post data
   */
  public async postDataToAPI(payload: any): Promise<ConnectionResult> {
    const options: NetworkTaskOptions = {
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      timeout: 15000
    };

    return this.executeAsyncTask(options);
  }
}
import { Component } from '@angular/core'; // or import from your framework
import { NetworkService } from './NetworkService';
import { ConnectionResult } from './types';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="onFetchData()">Fetch Data</button>
    <button (click)="onPostData()">Post Data</button>
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="result">{{ result | json }}</div>
    <div *ngIf="error" style="color: red;">Error: {{ error }}</div>
  `
})
export class AppComponent {
  private networkService: NetworkService;
  loading = false;
  result: any;
  error: string | null = null;

  constructor() {
    this.networkService = NetworkService.getInstance();
  }

  async onFetchData(): Promise<void> {
    this.loading = true;
    this.error = null;
    
    try {
      const response: ConnectionResult = await this.networkService.fetchDataFromAPI();
      
      if (response.success) {
        this.result = response.data;
      } else {
        this.error = response.error || 'Unknown error occurred';
      }
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  async onPostData(): Promise<void> {
    this.loading = true;
    this.error = null;
    
    const payload = {
      title: 'Test Post',
      body: 'This is a test post',
      userId: 1
    };

    try {
      const response: ConnectionResult = await this.networkService.postDataToAPI(payload);
      
      if (response.success) {
        this.result = response.data;
      } else {
        this.error = response.error || 'Unknown error occurred';
      }
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }
}
package com.yourapp;

import android.os.AsyncTask;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class NetworkTask extends AsyncTask<String, Void, String> {
    
    public interface NetworkTaskListener {
        void onTaskCompleted(String result);
        void onTaskFailed(String error);
    }
    
    private NetworkTaskListener listener;
    
    public NetworkTask(NetworkTaskListener listener) {
        this.listener = listener;
    }
    
    @Override
    protected String doInBackground(String... params) {
        try {
            String urlString = params[0];
            String method = params[1];
            String jsonData = params.length > 2 ? params[2] : null;
            
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod(method);
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setConnectTimeout(10000);
            connection.setReadTimeout(10000);
            
            if (jsonData != null && !jsonData.isEmpty()) {
                connection.setDoOutput(true);
                try (OutputStream os = connection.getOutputStream()) {
                    byte[] input = jsonData.getBytes("utf-8");
                    os.write(input, 0, input.length);
                }
            }
            
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String inputLine;
                StringBuilder response = new StringBuilder();
                
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();
                
                return response.toString();
            } else {
                return "Error: " + responseCode;
            }
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
    
    @Override
    protected void onPostExecute(String result) {
        if (result.startsWith("Error:")) {
            listener.onTaskFailed(result);
        } else {
            listener.onTaskCompleted(result);
        }
    }
}
