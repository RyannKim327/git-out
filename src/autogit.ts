import cron from 'node-cron';
import { Logger } from './logger'; // Assuming you have a logger utility

interface TaskResult {
  success: boolean;
  message: string;
  timestamp: Date;
}

class ScheduledTasks {
  private tasks: Map<string, cron.ScheduledTask> = new Map();
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger('ScheduledTasks');
  }

  // Schedule a cleanup task to run every day at 2:30 AM
  scheduleCleanupTask(): void {
    const taskId = 'cleanup-database';
    const task = cron.schedule('30 2 * * *', async () => {
      try {
        this.logger.info(`Starting scheduled cleanup task: ${taskId}`);
        
        const result = await this.performCleanup();
        
        if (result.success) {
          this.logger.info(`Cleanup completed: ${result.message}`);
        } else {
          this.logger.error(`Cleanup failed: ${result.message}`);
        }
      } catch (error) {
        this.logger.error(`Unexpected error in cleanup task: ${error.message}`);
      }
    }, {
      scheduled: true,
      timezone: 'America/New_York'
    });

    this.tasks.set(taskId, task);
    this.logger.info(`Scheduled cleanup task with ID: ${taskId}`);
  }

  // Schedule a health check to run every 5 minutes
  scheduleHealthCheck(): void {
    const taskId = 'health-check';
    const task = cron.schedule('*/5 * * * *', async () => {
      try {
        const healthStatus = await this.checkSystemHealth();
        
        if (healthStatus.healthy) {
          this.logger.info(`System health check passed: ${healthStatus.message}`);
        } else {
          this.logger.warn(`System health check warning: ${healthStatus.message}`);
        }
      } catch (error) {
        this.logger.error(`Health check failed: ${error.message}`);
      }
    });

    this.tasks.set(taskId, task);
    this.logger.info(`Scheduled health check task with ID: ${taskId}`);
  }

  // Schedule a data backup to run every Sunday at 11:00 PM
  scheduleBackupTask(): void {
    const taskId = 'weekly-backup';
    const task = cron.schedule('0 23 * * 0', async () => {
      try {
        this.logger.info('Starting weekly backup procedure...');
        
        const backupResult = await this.performBackup();
        
        if (backupResult.success) {
          this.logger.info(`Backup successful: ${backupResult.message}`);
          await this.sendBackupNotification(backupResult.message);
        } else {
          this.logger.error(`Backup failed: ${backupResult.message}`);
        }
      } catch (error) {
        this.logger.error(`Backup error: ${error.message}`);
      }
    }, {
      timezone: 'UTC'
    });

    this.tasks.set(taskId, task);
    this.logger.info(`Scheduled backup task with ID: ${taskId}`);
  }

  // Stop a specific scheduled task
  stopTask(taskId: string): boolean {
    const task = this.tasks.get(taskId);
    if (task) {
      task.stop();
      this.tasks.delete(taskId);
      this.logger.info(`Stopped task: ${taskId}`);
      return true;
    }
    return false;
  }

  // Stop all scheduled tasks
  stopAllTasks(): void {
    this.tasks.forEach((task, taskId) => {
      task.stop();
      this.logger.info(`Stopped task: ${taskId}`);
    });
    this.tasks.clear();
  }

  // Get list of active tasks
  getActiveTasks(): string[] {
    return Array.from(this.tasks.keys());
  }

  private async performCleanup(): Promise<TaskResult> {
    // Simulate cleanup operation
    await new Promise(resolve => setTimeout(resolve, 2000)); // Fake delay
    
    return {
      success: true,
      message: 'Cleaned up 1.5GB of temporary files',
      timestamp: new Date()
    };
  }

  private async checkSystemHealth(): Promise<{ healthy: boolean; message: string }> {
    // Simulate health check
    const randomStatus = Math.random() > 0.1; // 90% success rate
    
    return {
      healthy: randomStatus,
      message: randomStatus ? 'All systems operational' : 'High memory usage detected'
    };
  }

  private async performBackup(): Promise<TaskResult> {
    // Simulate backup process
    await new Promise(resolve => setTimeout(resolve, 5000)); // Fake delay
    
    const success = Math.random() > 0.2; // 80% success rate
    
    return {
      success,
      message: success ? 'Backup completed and stored in S3' : 'Backup storage quota exceeded',
      timestamp: new Date()
    };
  }

  private async sendBackupNotification(message: string): Promise<void> {
    // Simulate sending notification
    this.logger.info(`Notification sent: ${message}`);
  }
}

// Usage example
const taskScheduler = new ScheduledTasks();

// Schedule tasks
taskScheduler.scheduleCleanupTask();
taskScheduler.scheduleHealthCheck();
taskScheduler.scheduleBackupTask();

// Display active tasks after 1 second
setTimeout(() => {
  console.log('Active tasks:', taskScheduler.getActiveTasks());
}, 1000);

// Graceful shutdown handling
process.on('SIGINT', () => {
  console.log('\nShutting down scheduled tasks...');
  taskScheduler.stopAllTasks();
  process.exit(0);
});

// Example of stopping a specific task after 10 seconds
setTimeout(() => {
  taskScheduler.stopTask('health-check');
  console.log('Remaining tasks:', taskScheduler.getActiveTasks());
}, 10000);
npm install node-cron
npm install -D @types/node-cron typescript
