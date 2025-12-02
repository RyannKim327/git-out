import cron from 'node-cron';
import { logger } from './logger'; // Optional: Custom logger

interface ScheduledTask {
  name: string;
  schedule: string;
  task: () => Promise<void>;
  isRunning: boolean;
}

class TaskScheduler {
  private tasks: ScheduledTask[] = [];

  // Add a new scheduled task
  addTask(name: string, schedule: string, task: () => Promise<void>): void {
    const scheduledTask: ScheduledTask = {
      name,
      schedule,
      task,
      isRunning: false
    };

    this.tasks.push(scheduledTask);
  }

  // Start all scheduled tasks
  startAll(): void {
    this.tasks.forEach((task) => {
      const job = cron.schedule(task.schedule, async () => {
        if (task.isRunning) {
          logger.warn(`Task "${task.name}" is already running, skipping execution`);
          return;
        }

        task.isRunning = true;
        logger.info(`Starting task: ${task.name}`);

        try {
          await task.task();
          logger.info(`Task "${task.name}" completed successfully`);
        } catch (error) {
          logger.error(`Task "${task.name}" failed:`, error);
        } finally {
          task.isRunning = false;
        }
      });

      logger.info(`Scheduled task "${task.name}" with pattern: ${task.schedule}`);
      job.start();
    });
  }

  // Get all tasks
  getTasks(): ScheduledTask[] {
    return this.tasks;
  }
}

// Example usage
const scheduler = new TaskScheduler();

// Add a task that runs every minute
scheduler.addTask(
  'Database Cleanup',
  '* * * * *', // Every minute
  async () => {
    console.log('Cleaning up database...');
    // Simulate database cleanup
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Database cleanup completed');
  }
);

// Add a task that runs every day at 2:30 AM
scheduler.addTask(
  'Daily Report',
  '30 2 * * *', // 2:30 AM daily
  async () => {
    console.log('Generating daily report...');
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('Daily report generated');
  }
);

// Add a task that runs every Monday at 9:00 AM
scheduler.addTask(
  'Weekly Analytics',
  '0 9 * * 1', // 9:00 AM every Monday
  async () => {
    console.log('Running weekly analytics...');
    // Simulate analytics processing
    await new Promise(resolve => setTimeout(resolve, 10000));
    console.log('Weekly analytics completed');
  }
);

// Start all scheduled tasks
scheduler.startAll();

// Graceful shutdown handling
process.on('SIGINT', () => {
  console.log('\nShutting down scheduler...');
  process.exit(0);
});

// Optional: Display tasks (for debugging)
console.log('Scheduled tasks:', scheduler.getTasks().map(t => t.name));
npm install node-cron
npm install -D @types/node-cron typescript ts-node
// logger.ts
export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, ...args);
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, ...args);
  }
};
