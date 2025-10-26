import cron from 'node-cron';

// Our virtual cat
class VirtualCat {
  name: string;
  hunger: number; // 0 (full) to 10 (starving)

  constructor(name: string) {
    this.name = name;
    this.hunger = 5; // starting point
  }

  feed() {
    this.hunger = Math.max(0, this.hunger - 3);
    console.log(`🍖 Fed ${this.name}. Hunger level: ${this.hunger}`);
  }

  slowlyGetHungry() {
    this.hunger = Math.min(10, this.hunger + 1);
    console.log(`⏳ ${this.name} got hungrier. Hunger: ${this.hunger}`);
  }
}

const cat = new VirtualCat('Miso');

// Schedule: Every morning at 07:30
cron.schedule('30 7 * * *', () => {
  console.log(`[${new Date().toLocaleString()}] Morning routine...`);
  cat.feed();
});

// Just for fun, update hunger hourly
cron.schedule('0 * * * *', () => {
  cat.slowlyGetHungry();
});

console.log('🐱 Virtual cat scheduler running…');

// You can keep the process alive:
process.stdin.resume();
