const Bus = require('../schema/busSchema');

async function seedBuses() {
    const buses = [
        {
            licensePlate: '29A-12345',
            color: 'Red',
            manufacturer: 'Toyota',
            modelYear: 2019,
            model: 'Hiace',
            seats: 30,
            yearsInUse: 4,
            lastMaintenanceDate: new Date('2024-01-15'),
            totalDistance: 50000 // km
        },
        {
            licensePlate: '30B-67890',
            color: 'Blue',
            manufacturer: 'Ford',
            modelYear: 2020,
            model: 'Transit',
            seats: 28,
            yearsInUse: 3,
            lastMaintenanceDate: new Date('2024-05-10'),
            totalDistance: 40000
        },
        {
            licensePlate: '30B-67999',
            color: 'Blue',
            manufacturer: 'Ford',
            modelYear: 2018,
            model: 'Transit',
            seats: 28,
            yearsInUse: 3,
            lastMaintenanceDate: new Date('2023-05-10'),
            totalDistance: 60000
        }
    ];

    await Bus.insertMany(buses);
    console.log('Buses seeded');
}
module.exports = seedBuses;