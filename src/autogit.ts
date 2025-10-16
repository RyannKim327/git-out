import cron from 'node-cron';
import axios from 'axios';
import fs from 'fs/promises';

interface WeatherData {
  temperature: number;
  description: string;
  timestamp: Date;
}

class TaskScheduler {
  private weatherHistory: WeatherData[] = [];
  private logFile = 'task_log.txt';

  constructor() {
    this.setupCronJobs();
    console.log('Task Scheduler initialized!');
  }

  private setupCronJobs(): void {
    // Run every minute
    cron.schedule('* * * * *', () => {
      this.logCurrentTime();
    });

    // Run every 5 minutes
    cron.schedule('*/5 * * * *', () => {
      this.fetchWeatherData();
    });

    // Run every day at 8:00 AM
    cron.schedule('0 8 * * *', () => {
      this.sendDailyReport();
    });

    // Run every Sunday at 11:59 PM
    cron.schedule('59 23 * * 0', () => {
      this.cleanupOldData();
    });

    // Run every 30 minutes during business hours (9 AM - 5 PM, Monday-Friday)
    cron.schedule('*/30 9-17 * * 1-5', () => {
      this.businessHourTask();
    });
  }

  private async logCurrentTime(): Promise<void> {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] Heartbeat - System is running\n`;
    
    try {
      await fs.appendFile(this.logFile, logMessage);
      console.log(`Logged: ${timestamp}`);
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  private async fetchWeatherData(): Promise<void> {
    try {
      // Using a mock weather API
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=London&appid=your-api-key&units=metric');
      
      const weatherData: WeatherData = {
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        timestamp: new Date()
      };

      this.weatherHistory.push(weatherData);
      console.log(`Weather fetched: ${weatherData.temperature}°C, ${weatherData.description}`);
      
      // Keep only last 100 records
      if (this.weatherHistory.length > 100) {
        this.weatherHistory = this.weatherHistory.slice(-100);
      }
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    }
  }

  private async sendDailyReport(): Promise<void> {
    const report = {
      date: new Date().toDateString(),
      totalWeatherRecords: this.weatherHistory.length,
      averageTemperature: this.calculateAverageTemperature(),
      tasksExecuted: await this.countDailyTasks()
    };

    console.log('=== DAILY REPORT ===');
    console.log(`Date: ${report.date}`);
    console.log(`Weather Records: ${report.totalWeatherRecords}`);
    console.log(`Avg Temp: ${report.averageTemperature}°C`);
    console.log('====================');
  }

  private calculateAverageTemperature(): number {
    if (this.weatherHistory.length === 0) return 0;
    
    const sum = this.weatherHistory.reduce((acc, data) => acc + data.temperature, 0);
    return parseFloat((sum / this.weatherHistory.length).toFixed(2));
  }

  private async countDailyTasks(): Promise<number> {
    try {
      const logContent = await fs.readFile(this.logFile, 'utf-8');
      const today = new Date().toDateString();
      const todayTasks = logContent.split('\n').filter(line => line.includes(today));
      return todayTasks.length;
    } catch (error) {
      return 0;
    }
  }

  private cleanupOldData(): void {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    this.weatherHistory = this.weatherHistory.filter(
      data => data.timestamp > oneWeekAgo
    );
    
    console.log(`Weekly cleanup completed. ${this.weatherHistory.length} weather records remain.`);
  }

  private businessHourTask(): void {
    console.log('Business hour task executed - simulating important work...');
    // Simulate some business logic
    const randomData = Array.from({ length: 1000 }, (_, i) => i * Math.random());
    const sum = randomData.reduce((acc, num) => acc + num, 0);
    console.log(`Business task completed. Sum: ${sum.toFixed(2)}`);
  }

  public getWeatherHistory(): WeatherData[] {
    return [...this.weatherHistory];
  }

  public stopAllTasks(): void {
    // In a real implementation, you'd want to keep track of cron jobs
    console.log('Stopping all scheduled tasks...');
    // This would typically involve storing cron job references and stopping them
  }
}

// Usage example
const scheduler = new TaskScheduler();

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  scheduler.stopAllTasks();
  process.exit(0);
});

// Keep the process alive
setInterval(() => {
  // Keep the event loop busy
}, 1000);
npm install node-cron axios
npm install --save-dev @types/node-cron @types/node
