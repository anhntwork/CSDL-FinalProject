const mongoose = require('mongoose');
const seedBuses = require('./Buses');
const seedDrivers = require('./Drivers');
const seedRoutes = require('./Routes');
const seedTrips = require('./Trips');

const { connectionString } = require('../../appConfig')

console.log("connectionString", connectionString)

mongoose.connect(connectionString)
    .then(async () => {
        console.log('Connected to MongoDB');

        // Seed data
        await seedBuses();
        await seedDrivers();
        await seedRoutes();
        await seedTrips();

        mongoose.disconnect();
    })
    .catch(err => console.error('Error connecting to MongoDB', err));
