import { createClient, print } from 'redis';

const client = createClient();
    
client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
});

client.on('ready', () => {
    console.log('Redis client connected to the server');

    const hash_key = 'HolbertonSchools';

    client.hset(hash_key, 'Portland', 50, print);
    client.hset(hash_key,'Seattle', 80, print);
    client.hset(hash_key,'New York', 20, print);
    client.hset(hash_key,'Bogota', 20, print);
    client.hset(hash_key,'Cali', 40, print);
    client.hset(hash_key,'Paris', 2, print);

    client.hgetall(hash_key, (error, reply) => {
        console.log(JSON.stringify(reply, null, 2));
        client.quit();
    });
});
