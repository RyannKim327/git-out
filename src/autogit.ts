import cron from 'node-cron';
import { sendEmailReport, cleanupTempFiles, backupDatabase } from './utils';

// 1. Daily email report at 9:00 AM
cron.schedule('0 9 * * *', () => {
  console.log('📧 Sending daily email report...');
  sendEmailReport();
}, {
  timezone: 'America/New_York'
});

// 2. Cleanup temp files every 30 minutes
cron.schedule('*/30 * * * *', () => {
  console.log('🧹 Cleaning up temporary files...');
  cleanupTempFiles();
});

// 3. Database backup every Sunday at 2:00 AM
cron.schedule('0 2 * * 0', () => {
  console.log('💾 Starting weekly database backup...');
  backupDatabase()
    .then(() => console.log('✅ Backup completed successfully'))
    .catch((error) => console.error('❌ Backup failed:', error));
});

// 4. Health check every 5 minutes during business hours (9 AM - 5 PM, Mon-Fri)
cron.schedule('*/5 9-17 * * 1-5', async () => {
  console.log('🩺 Performing health check...');
  try {
    const status = await checkSystemHealth();
    console.log(`Health status: ${status}`);
  } catch (error) {
    console.error('Health check failed:', error);
  }
});

// 5. Random demo task that runs every 10 seconds
cron.schedule('*/10 * * * * *', () => {
  const randomValue = Math.floor(Math.random() * 100);
  console.log(`🎲 Random value generated: ${randomValue}`);
  if (randomValue > 90) {
    console.log('🚨 High value alert!');
  }
});

console.log('⏰ Cron jobs initialized. Press Ctrl+C to stop.');

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping cron jobs...');
  process.exit(0);
});
// utils.ts
export function sendEmailReport(): void {
  // Simulate email sending
  console.log('Email report sent to admin@company.com');
}

export function cleanupTempFiles(): void {
  // Simulate file cleanup
  console.log('Temp files cleaned up');
}

export async function backupDatabase(): Promise<void> {
  // Simulate database backup
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Database backed up to cloud storage');
      resolve();
    }, 2000);
  });
}

export async function checkSystemHealth(): Promise<string> {
  // Simulate health check
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('OK');
    }, 500);
  });
}
{
  "dependencies": {
    "node-cron": "^3.0.2",
    "@types/node-cron": "^3.0.8"
  }
}
