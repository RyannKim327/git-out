import cron from 'node-cron';
import { format } from 'date-fns';

// Create a scheduled task that runs every minute
const scheduledJob = cron.schedule('* * * * *', () => {
    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    console.log(`[${timestamp}] Cron job running every minute!`);
    
    // Your recurring task logic goes here
    // e.g., database cleanup, API calls, file processing
});

// Start the cron job
scheduledJob.start();
console.log('Cron job scheduled to run every minute');

// Example: Stop the job after 5 minutes
setTimeout(() => {
    scheduledJob.stop();
    console.log('Cron job stopped after 5 minutes');
}, 5 * 60 * 1000);
import cron from 'node-cron';

// Simulated database backup function
async function performBackup() {
    console.log('Starting database backup...');
    // Your actual backup logic here
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Backup completed successfully!');
            resolve(true);
        }, 2000);
    });
}

// Schedule backups daily at 2:30 AM
cron.schedule('0 30 2 * * *', async () => {
    try {
        await performBackup();
        console.log('Scheduled backup finished');
    } catch (error) {
        console.error('Backup failed:', error);
    }
}, {
    scheduled: true,
    timezone: 'America/New_York'
});

console.log('Database backup scheduled for daily 2:30 AM EST');
