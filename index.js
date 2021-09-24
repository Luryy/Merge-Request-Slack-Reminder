import http from 'http';
import cron from 'node-cron'
import { init } from './src/init.js'

const port = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ name: 'MReminder', ver: '1.0.0' }));
    res.end();
  })
  .listen(port, () => {
    console.info(`Server listening on port ${port}`)

    cron.schedule(process.env.CRON_TASK_INTERVAL, () => {
      console.log('Running task');
      init()
    }, {
      scheduled: true,
      timezone: process.env.TASK_INTERVAL_TIMEZONE
    });
  });
