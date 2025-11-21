// -- TypeScript Client (e.g., in a web app, React Native, or Node.js script) --

/**
 * Interface for the data payload we'll send to Android.
 */
interface SensorData {
    sensorId: string;
    temperature: number;
    unit: string;
    timestamp: string;
}

/**
 * Interface for the expected response from the Android device.
 */
interface AndroidServerResponse {
    status: 'success' | 'error';
    message: string;
    receivedData?: SensorData;
    processedTimestamp?: string;
}

/**
 * Sends sensor data to a specified Android device's endpoint.
 *
 * @param deviceIp The local IP address of the Android device (e.g., '192.168.1.100').
 * @param port The port the Android server is listening on (e.g., 8080).
 * @param data The SensorData object to send.
 * @returns A Promise that resolves with the server response or null if an error occurred.
 */
async function sendDataToAndroidDevice(
    deviceIp: string,
    port: number,
    data: SensorData
): Promise<AndroidServerResponse | null> {
    const url = `http://${deviceIp}:${port}/api/sensor-data`; // Adjust endpoint as needed
    console.log(`[TypeScript Client] Attempting to send data to: ${url}`);
    console.log(`[TypeScript Client] Payload: ${JSON.stringify(data)}`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            // Handle HTTP errors (4xx, 5xx)
            const errorText = await response.text();
            console.error(`[TypeScript Client] HTTP error! Status: ${response.status}, Message: ${errorText}`);
            throw new Error(`Server responded with status ${response.status}: ${errorText}`);
        }

        const responseJson: AndroidServerResponse = await response.json();
        console.log('[TypeScript Client] Successfully received response from Android device:', responseJson);
        return responseJson;

    } catch (error) {
        console.error('[TypeScript Client] Error connecting to Android device or processing response:', error);
        // Optionally re-throw or return a specific error object
        return null;
    }
}

// --- Example Usage ---
const androidDeviceIp = '192.168.1.100'; // <<< IMPORTANT: REPLACE WITH YOUR ANDROID DEVICE'S LOCAL IP ADDRESS!
const androidServerPort = 8080;         // Port your Android app's server will listen on

const sensorPayload: SensorData = {
    sensorId: 'TS-TEMP-001',
    temperature: 24.5,
    unit: 'Celsius',
    timestamp: new Date().toISOString()
};

(async () => {
    console.log('\n--- Starting TypeScript Client Request ---\n');
    const result = await sendDataToAndroidDevice(androidDeviceIp, androidServerPort, sensorPayload);

    if (result) {
        console.log('\n--- Request Completed Successfully ---');
        console.log('Final Result Status:', result.status);
        console.log('Final Result Message:', result.message);
    } else {
        console.log('\n--- Request Failed ---');
    }
    console.log('\n----------------------------------------\n');
})();
// -- Android App Code (e.g., in your MainActivity.java) --

import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONException;
import org.json.JSONObject;
import fi.iki.elonen.NanoHTTPD;

import java.io.IOException;
import java.util.Map;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "AndroidServer";
    private static final int PORT = 8080; // Must match the port in TypeScript client

    private SimpleWebServer webServer;
    private TextView logTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main); // Assuming you have an activity_main.xml with a TextView for logs

        logTextView = findViewById(R.id.logTextView); // Assuming you have <TextView android:id="@+id/logTextView" ... />

        startServer();
    }

    private void startServer() {
        try {
            webServer = new SimpleWebServer(PORT);
            webServer.start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
            appendLogToUI("Server started successfully on port " + PORT);
            appendLogToUI("Connect from TypeScript client to: http://<YOUR_DEVICE_IP>:" + PORT + "/api/sensor-data");
        } catch (IOException e) {
            Log.e(TAG, "Could not start server: " + e.getMessage());
            appendLogToUI("Error starting server: " + e.getMessage());
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (webServer != null) {
            webServer.stop();
            Log.d(TAG, "Server stopped.");
            appendLogToUI("Server stopped.");
        }
    }

    private void appendLogToUI(final String message) {
        runOnUiThread(() -> {
            logTextView.append(message + "\n");
            // Optional: Scroll to the bottom
            // final ScrollView scrollView = findViewById(R.id.scrollView); // If you wrap logTextView in a ScrollView
            // if (scrollView != null) {
            //     scrollView.post(() -> scrollView.fullScroll(View.FOCUS_DOWN));
            // }
        });
    }

    /**
     * NanoHttpd server implementation.
     */
    private class SimpleWebServer extends NanoHTTPD {

        public SimpleWebServer(int port) {
            super(port);
        }

        @Override
        public Response serve(IHTTPSession session) {
            appendLogToUI("Incoming request: " + session.getMethod() + " " + session.getUri());

            // Handle only POST requests to our specific endpoint
            if (Method.POST.equals(session.getMethod()) && "/api/sensor-data".equals(session.getUri())) {
                try {
                    // Read the request body
                    Map<String, String> files = new java.util.HashMap<>();
                    session.parseBody(files); // Parses the body into 'files' map (NanoHttpd's way)
                    String requestBody = files.get("postData"); // This key holds the raw POST data

                    if (requestBody == null || requestBody.isEmpty()) {
                        appendLogToUI("Error: Empty request body.");
                        return newFixedLengthResponse(Response.Status.BAD_REQUEST, "application/json",
                                "{\"status\":\"error\",\"message\":\"Empty request body\"}");
                    }

                    appendLogToUI("Received POST body: " + requestBody);

                    // Parse the JSON request body
                    JSONObject requestJson = new JSONObject(requestBody);

                    // Execute AsyncTask for background processing
                    new ProcessSensorDataAsyncTask().execute(requestJson);

                    // Send an immediate success response to the client
                    JSONObject responseJson = new JSONObject();
                    responseJson.put("status", "success");
                    responseJson.put("message", "Data received and queued for processing.");
                    responseJson.put("receivedData", requestJson); // Echo back received data
                    responseJson.put("processedTimestamp", new java.util.Date().toInstant().toString());

                    return newFixedLengthResponse(Response.Status.OK, "application/json", responseJson.toString());

                } catch (IOException | ResponseException | JSONException e) {
                    Log.e(TAG, "Server error processing request: " + e.getMessage(), e);
                    appendLogToUI("Server error: " + e.getMessage());
                    return newFixedLengthResponse(Response.Status.INTERNAL_ERROR, "application/json",
                            "{\"status\":\"error\",\"message\":\"Server error: " + e.getMessage() + "\"}");
                }
            } else {
                // For other requests or methods, return a 404
                appendLogToUI("Unhandled request: " + session.getMethod() + " " + session.getUri());
                return newFixedLengthResponse(Response.Status.NOT_FOUND, "text/plain", "404 Not Found");
            }
        }
    }

    /**
     * AsyncTask to process the incoming sensor data in the background.
     * <p>
     * Params: JSONObject (the data to process)
     * Progress: Void (no progress updates)
     * Result: String (a message indicating the processing result)
     */
    private class ProcessSensorDataAsyncTask extends AsyncTask<JSONObject, Void, String> {

        private JSONObject dataReceived;

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            appendLogToUI("[AsyncTask] Starting background processing...");
            // UI Thread: Show a progress indicator if needed
        }

        @Override
        protected String doInBackground(JSONObject... jsonObjects) {
            if (jsonObjects == null || jsonObjects.length == 0) {
                return "Error: No data provided to AsyncTask.";
            }

            dataReceived = jsonObjects[0]; // Store for onPostExecute
            try {
                // Simulate a long-running operation, e.g., saving to DB, sending to remote server
                String sensorId = dataReceived.getString("sensorId");
                double temperature = dataReceived.getDouble("temperature");
                String unit = dataReceived.getString("unit");

                Log.d(TAG, "[AsyncTask] Processing sensor data: " + sensorId + ", Temp: " + temperature + " " + unit);
                Thread.sleep(3000); // Simulate 3 seconds of heavy work

                // Here you would typically perform actual business logic:
                // - Save to SQLite database
                // - Send to a backend API (using another network request)
                // - Perform complex calculations
                // - Update application state

                return "Successfully processed data for sensor: " + sensorId + " (Temperature: " + temperature + " " + unit + ")";

            } catch (JSONException e) {
                Log.e(TAG, "[AsyncTask] Error parsing JSON in background: " + e.getMessage());
                return "Error: Invalid JSON data received for processing.";
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt(); // Restore the interrupted status
                Log.e(TAG, "[AsyncTask] Background task interrupted: " + e.getMessage());
                return "Error: Background task interrupted.";
            } catch (Exception e) {
                Log.e(TAG, "[AsyncTask] Unexpected error during processing: " + e.getMessage());
                return "Error: An unexpected error occurred during processing.";
            }
        }

        @Override
        protected void onPostExecute(String result) {
            super.onPostExecute(result);
            appendLogToUI("[AsyncTask] Finished: " + result);
            // UI Thread: Update UI with the result, hide progress indicator
            // For example, you could display the processed data in another TextView
        }
    }
}
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="16dp"
    tools:context=".MainActivity">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">

        <TextView
            android:id="@+id/statusTextView"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Android Server Status:"
            android:textSize="18sp"
            android:textStyle="bold"
            android:layout_marginBottom="8dp" />

        <TextView
            android:id="@+id/logTextView"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:background="#e0e0e0"
            android:fontFamily="monospace"
            android:padding="8dp"
            android:scrollbars="vertical"
            android:text="Server logs will appear here...\n"
            android:textSize="12sp" />

    </LinearLayout>
</ScrollView>
