import { createClient, print } from 'redis';
import util from 'util';

const client = createClient();
    
client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
});

client.on('ready', () => {
    console.log('Redis client connected to the server');
});

function setNewSchool(schoolName, value) {
    client.set(schoolName, value, print);
}

const getAsync = util.promisify(client.get).bind(client);

async function displaySchoolValue(schoolName) {
    try {
        const value = await getAsync(schoolName);
        console.log(`${value}`);
    } catch(err) {
        console.error(err);
    }
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
