npm install node-cron
npm install @types/node-cron --save-dev
import cron from 'node-cron';
import { Logger } from './logger'; // Optional custom logger

// Interface for task configuration
interface ScheduledTask {
  id: string;
  name: string;
  schedule: string;
  timezone?: string;
  enabled: boolean;
}

// Sample task configuration
const scheduledTasks: ScheduledTask[] = [
  {
    id: 'cleanup',
    name: 'Database Cleanup',
    schedule: '0 2 * * *', // Every day at 2:00 AM
    timezone: 'America/New_York',
    enabled: true
  },
  {
    id: 'backup',
    name: 'System Backup',
    schedule: '0 */6 * * *', // Every 6 hours
    enabled: true
  },
  {
    id: 'health-check',
    name: 'Health Check',
    schedule: '*/5 * * * *', // Every 5 minutes
    enabled: true
  }
];

// Task execution functions
class TaskRunner {
  static async runDatabaseCleanup(): Promise<void> {
    console.log('Running database cleanup...');
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Database cleanup completed');
  }

  static async runSystemBackup(): Promise<void> {
    console.log('Running system backup...');
    // Simulate backup process
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('System backup completed');
  }

  static async runHealthCheck(): Promise<void> {
    console.log('Running health check...');
    // Check system status
    const timestamp = new Date().toISOString();
    console.log(`Health check completed at ${timestamp}`);
  }
}

// Cron job manager
class CronManager {
  private tasks: Map<string, cron.ScheduledTask> = new Map();

  scheduleTask(taskConfig: ScheduledTask): void {
    if (!taskConfig.enabled) {
      console.log(`Task ${taskConfig.name} is disabled`);
      return;
    }

    const task = cron.schedule(
      taskConfig.schedule,
      () => this.executeTask(taskConfig),
      {
        scheduled: true,
        timezone: taskConfig.timezone
      }
    );

    this.tasks.set(taskConfig.id, task);
    console.log(`Scheduled task: ${taskConfig.name} (${taskConfig.schedule})`);
  }

  private async executeTask(taskConfig: ScheduledTask): Promise<void> {
    const startTime = Date.now();
    console.log(`\n--- Starting task: ${taskConfig.name} ---`);

    try {
      switch (taskConfig.id) {
        case 'cleanup':
          await TaskRunner.runDatabaseCleanup();
          break;
        case 'backup':
          await TaskRunner.runSystemBackup();
          break;
        case 'health-check':
          await TaskRunner.runHealthCheck();
          break;
        default:
          console.warn(`Unknown task ID: ${taskConfig.id}`);
      }

      const duration = Date.now() - startTime;
      console.log(`Task ${taskConfig.name} completed in ${duration}ms`);
    } catch (error) {
      console.error(`Error executing task ${taskConfig.name}:`, error);
    }
  }

  startAll(tasks: ScheduledTask[]): void {
    tasks.forEach(task => this.scheduleTask(task));
    console.log('\nAll tasks scheduled. Cron jobs are running...');
  }

  stopTask(taskId: string): void {
    const task = this.tasks.get(taskId);
    if (task) {
      task.stop();
      console.log(`Stopped task: ${taskId}`);
    }
  }

  stopAll(): void {
    this.tasks.forEach(task => task.stop());
    console.log('All cron jobs stopped');
  }

  listTasks(): void {
    console.log('\nActive Cron Jobs:');
    this.tasks.forEach((task, id) => {
      console.log(`- ${id}: ${task.getStatus()}`);
    });
  }
}

// Main application
class CronApplication {
  private cronManager: CronManager;

  constructor() {
    this.cronManager = new CronManager();
  }

  start(): void {
    console.log('Starting Cron Application...');
    this.cronManager.startAll(scheduledTasks);

    // Graceful shutdown
    process.on('SIGINT', () => this.shutdown());
    process.on('SIGTERM', () => this.shutdown());
  }

  private shutdown(): void {
    console.log('\nShutting down Cron Application...');
    this.cronManager.stopAll();
    process.exit(0);
  }
}

// Run the application
const app = new CronApplication();
app.start();

// Utility function to demonstrate manual execution
export const manualTest = async (): Promise<void> => {
  console.log('Running manual test...');
  await TaskRunner.runDatabaseCleanup();
  await TaskRunner.runSystemBackup();
  await TaskRunner.runHealthCheck();
};

// Example of using the manual test
// manualTest().then(() => console.log('Manual test completed'));
