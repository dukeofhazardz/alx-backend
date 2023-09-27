import { createClient } from "redis";
const client = createClient();

import util from 'util';
const getAsync = util.promisify(client.get).bind(client);
const setAsync = util.promisify(client.set).bind(client);
const initialSeats = 50;
setAsync('available_seats', initialSeats);

import kue from "kue";
const queue = kue.createQueue();

const express = require('express');
const app = express();
const port = 1245;

let reservationEnabled = true;

function reserveSeat(number) {
    setAsync('available_seats', number);
}

async function getCurrentAvailableSeats() {
    try {
        const value = await getAsync('available_seats');
        return parseInt(value);
    } catch(err) {
        console.error(err);
    }
}

app.get('/available_seats', async (req, res) => {
    const availableSeats = await getCurrentAvailableSeats();
    res.json({numberOfAvailableSeats: availableSeats.toString()});
});

app.get('/reserve_seat', (req, res) => {
    if (reservationEnabled === false) {
        res.json({status: 'Reservation are blocked'});
    } else {
        const job = queue.create('reserve_seat').save((err) => {
            if (err) {
                res.json({status: 'Reservation failed'});
                console.log(`Seat reservation job ${job.id} failed: ${err}`);
            } else {
                res.json({status: 'Reservation in process'});
                console.log(`Seat reservation job ${job.id} completed`);
            }
        });
    }
});

app.get('/process', async (req, res) => {
    res.json({status: 'Queue processing'});

    const availableSeats = await getCurrentAvailableSeats();

    if (availableSeats > 0) {
        const job = queue.create('reserve_seat').removeOnComplete(true).save();
        reserveSeat(availableSeats - 1);

        if (availableSeats - 1 === 0) {
            reservationEnabled = false;
        }
        job.on('complete', () => {
            console.log(`Seat reservation job ${job.id} completed`);
        });
        job.on('failed', (err) => {
            console.log(`Seat reservation job ${job.id} failed: ${err}`);
        });
    } else {
        console.log('Not enough seats available');
    }
});

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});
