import { expect } from 'chai';
import kue from "kue";
import createPushNotificationsJobs from "./8-job.js";


describe('createPushNotificationsJobs', () => {
    let queue;
  
    before(() => {
      // Create a Kue queue in test mode
      queue = kue.createQueue({ redis: { port: 6379, host: '127.0.0.1' } });
      queue.testMode.enter();
    });
  
    after(() => {
      // Clear the queue and exit test mode
      queue.testMode.clear();
      queue.testMode.exit();
    });
  
    it('should display an error message if jobs is not an array', () => {
        const invalidJobs = 'invalidData';
        try {
          createPushNotificationsJobs(invalidJobs, queue);
        } catch (error) {
          expect(error).to.be.an.instanceOf(Error);
          expect(error.message).to.equal('Jobs is not an array');
        }
    });

    it('should create jobs in the queue', () => {
        it('should create jobs in the queue', () => {
            const jobsList = [
              { phoneNumber: '4151234567', message: 'Message 1' },
              { phoneNumber: '4159876543', message: 'Message 2' },
            ];

            createPushNotificationsJobs(jobsList, queue);

            const jobsInQueue = queue.testMode.jobs;

            expect(jobsInQueue.length).to.equal(jobsList.length);

            const firstJob = jobsInQueue[0];
            expect(firstJob.data.phoneNumber).to.equal('4151234567');
            expect(firstJob.data.message).to.equal('Message 1');

            const secondJob = jobsInQueue[1];
            expect(secondJob.data.phoneNumber).to.equal('4159876543');
            expect(secondJob.data.message).to.equal('Message 2');
          });          
    });
  });