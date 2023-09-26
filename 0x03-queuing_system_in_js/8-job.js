function createPushNotificationsJobs(jobs, queue) {
    if (!Array.isArray(jobs)) {
        console.error('Jobs is not an array');
    }

    for (const jobObj of jobs) {
        const job = queue.create('push_notification_code_3', jobObj);

        job.on('enqueue', () => {
            console.log(`Notification job created: ${job.id}`);
        });

        job.on('complete', () => {
            console.log(`Notification job ${job.id} completed`);
        });

        job.on('failed', (err) => {
            console.log(`Notification job ${job.id} failed: ${err}`);
        });

        job.on('progress', (progress) => {
            console.log(`Notification job ${job.id} ${progress} complete`);
        });

        job.save();
    }
}

module.exports = createPushNotificationsJobs;
