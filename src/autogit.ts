import * as cron from 'node-cron';
import { sendEmailReport } from './email-service';
import { cleanupTempFiles } from './file-cleanup';
import { fetchAndProcessData } from './data-processor';

// Scheduled tasks configuration
interface ScheduledTask {
  name: string;
  schedule: string;
  task: () => Promise<void>;
  timezone?: string;
  enabled: boolean;
}

// Define scheduled tasks
const scheduledTasks: ScheduledTask[] = [
  {
    name: 'Daily Email Report',
    schedule: '0 9 * * *', // 9:00 AM every day
    task: async () => {
      console.log('Sending daily email report...');
      await sendEmailReport();
      console.log('Daily email report sent successfully');
    },
    timezone: 'America/New_York',
    enabled: true
  },
  {
    name: 'Hourly Data Processing',
    schedule: '0 * * * *', // Every hour at :00
    task: async () => {
      console.log('Starting hourly data processing...');
      await fetchAndProcessData();
      console.log('Hourly data processing completed');
    },
    enabled: true
  },
  {
    name: 'Weekly File Cleanup',
    schedule: '0 0 * * 0', // Sunday at midnight
    task: async () => {
      console.log('Starting weekly file cleanup...');
      await cleanupTempFiles();
      console.log('Weekly file cleanup completed');
    },
    enabled: process.env.ENABLE_FILE_CLEANUP === 'true'
  }
];

// Initialize cron jobs
export function initializeCronJobs(): void {
  scheduledTasks.forEach((taskConfig) => {
    if (!taskConfig.enabled) {
      console.log(`Task "${taskConfig.name}" is disabled`);
      return;
    }

    try {
      const task = cron.schedule(
        taskConfig.schedule,
        async () => {
          try {
            await taskConfig.task();
          } catch (error) {
            console.error(`Error executing task "${taskConfig.name}":`, error);
          }
        },
        {
          scheduled: true,
          timezone: taskConfig.timezone
        }
      );

      console.log(`Scheduled task "${taskConfig.name}" with pattern: ${taskConfig.schedule}`);
      
      // Graceful shutdown handling
      process.on('SIGINT', () => {
        console.log(`Stopping task "${taskConfig.name}"...`);
        task.stop();
        process.exit(0);
      });

    } catch (error) {
      console.error(`Failed to schedule task "${taskConfig.name}":`, error);
    }
  });
}

// Mock service functions (would be implemented in separate files)
async function sendEmailReport(): Promise<void> {
  // Implementation for sending email report
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async work
}

async function cleanupTempFiles(): Promise<void> {
  // Implementation for cleaning up temporary files
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate async work
}

async function fetchAndProcessData(): Promise<void> {
  // Implementation for data processing
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate async work
}

// Start the cron jobs when this module is imported
if (require.main === module) {
  console.log('Initializing cron jobs...');
  initializeCronJobs();
  console.log('Cron jobs initialized. Server is running scheduled tasks.');
}
npm install node-cron
npm install -D @types/node-cron typescript ts-node
