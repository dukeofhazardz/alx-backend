const kue = require('kue');
const queue = kue.createQueue();

const jobObj = {
    phoneNumber: '+56749333883',
    message: 'Hello World',
  };

const job = queue.create('push_notification_code', jobObj);

job.on('enqueue', () => {
    console.log(`Notification job created: ${job.id}`);
});

job.on('complete', () => {
    console.log('Notification job completed');
});

job.on('failed', () => {
    console.log('Notification job failed');
});

job.save();
