// AndroidAsyncDemo.ts
import { AndroidApplication, AndroidActivityEventData } from "@nativescript/core";
import * as http from "http";

export class AndroidAsyncDemo {
    private activity: android.app.Activity;

    constructor() {
        const eventData = <AndroidActivityEventData>androidApplication.currentContext.getActivity();
        this.activity = eventData.activity;
    }

    public startDemo() {
        // URL you care about
        const url = "https://api.github.com/users/nativescript";

        // Create an instance of the AsyncTask wrapper
        const task = new HttpGetAsyncTask(this.activity, url);
        task.execute();
    }
}

// --------------------------------------------
//  AsyncTask wrapper – looks a bit like Java
// --------------------------------------------
class HttpGetAsyncTask extends java.lang.Object implements android.os.AsyncTask<string, void, string> {

    private activity: android.app.Activity;
    private url: string;
    private resultView: android.widget.TextView;

    constructor(activity: android.app.Activity, url: string) {
        super();
        this.activity = activity;
        this.url = url;
        this.resultView = new android.widget.TextView(activity);
        this.resultView.setLayoutParams(
            new android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
                android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
            )
        );
        this.activity.runOnUiThread(() => {
            const root = this.activity.findViewById(android.R.id.content);
            if (root instanceof android.widget.LinearLayout) {
                root.addView(this.resultView);
            }
        });
    }

    // @Override
    public doInBackground(...params: string[]): string {
        try {
            // Using Node's http wrapper that works in NativeScript
            const response = http.getSync(this.url);
            return response.content.toString();
        } catch (err) {
            return `Error: ${err.message || err}`;
        }
    }

    // @Override
    public onPostExecute(result: string): void {
        this.resultView.setText(result);
    }

    // The following method signatures satisfy the interface contract
    public onPreExecute(): void {}
    public onProgressUpdate(...values: void[]): void {}
}

// --------------------------------------------
//  Use it from your page or component
// --------------------------------------------
export function demoClicked() {
    const demo = new AndroidAsyncDemo();
    demo.startDemo();
}
