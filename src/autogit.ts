// src/cronExample.ts
import cron from 'node-cron';

/**
 * A tiny “daily-surprise” service that runs every 30 seconds
 * (so you don’t have to wait a whole day while testing).
 * In real life you’d change the pattern to '0 9 * * *' for 09:00 daily.
 */
class SurpriseService {
  private task = cron.schedule('*/30 * * * * *', () => this.deliverSurprise(), {
    scheduled: false,
  });

  private readonly goodies = [
    '🍕  Pizza coupon: -10 %',
    '🎮  New game released today',
    '🎵  Random Spotify playlist',
    '📚  Book recommendation',
    '☕  Coffee voucher',
  ];

  start(): void {
    this.task.start();
    console.log('[SurpriseService] Started – next surprise in 30 s…');
  }

  stop(): void {
    this.task.stop();
    console.log('[SurpriseService] Stopped');
  }

  private deliverSurprise(): void {
    const pick = this.goodies[Math.floor(Math.random() * this.goodies.length)];
    console.log(`[${new Date().toISOString()}] 🎁  Today's surprise: ${pick}`);
  }
}

/* ------------------------------------------------------------------ */
/* Quick demo – start the service and stop it after 2 minutes         */
/* ------------------------------------------------------------------ */
const service = new SurpriseService();
service.start();

setTimeout(() => service.stop(), 2 * 60 * 1000);
npm i node-cron
npx ts-node src/cronExample.ts
