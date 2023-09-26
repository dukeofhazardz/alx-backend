import { createClient } from 'redis';

const subscriber = createClient();
    
subscriber.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
});

subscriber.on('ready', () => {
    console.log('Redis client connected to the server');
});

subscriber.subscribe('holberton school channel');

subscriber.on('message', (channel, message) => {
    if (message === 'KILL_SERVER') {
        subscriber.unsubscribe('holberton school channel', () => {
            subscriber.quit();
        });
    }
    console.log(message);
});
