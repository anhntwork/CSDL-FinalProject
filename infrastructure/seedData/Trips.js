const Trip = require('../schema/tripSchema');
const Bus = require('../schema/busSchema');
const Driver = require('../schema/driverSchema');
const Route = require('../schema/routeSchema');

async function seedTrips() {
    const bus1 = await Bus.findOne({ licensePlate: '29A-12345' });
    const driver1 = await Driver.findOne({ name: 'Nguyễn Văn A' });
    const assistantDriver1 = await Driver.findOne({ name: 'Trần Thị B' });

    const bus2 = await Bus.findOne({ licensePlate: '30B-67890' });
    const driver2 = await Driver.findOne({ name: 'Trần Thị B' });
    const assistantDriver2 = await Driver.findOne({ name: 'Nguyễn Văn A' });

    const route1 = await Route.findOne({ startPoint: 'Hà Nội', endPoint: 'Hải Phòng' });
    const route2 = await Route.findOne({ startPoint: 'Hà Nội', endPoint: 'Sài Gòn' });

    const trips = [
        {
            bus: bus1._id,
            route: route1._id,
            driver: driver1._id,
            assistantDriver: assistantDriver1._id,
            passengers: 28,
            ticketPrice: 100000,
            date: new Date('2024-09-12')
        },
        {
            bus: bus1._id,
            route: route1._id,
            driver: driver1._id,
            assistantDriver: assistantDriver1._id,
            passengers: 26,
            ticketPrice: 100000,
            date: new Date('2024-09-13')
        },
        {
            bus: bus2._id,
            route: route2._id,
            driver: driver2._id,
            assistantDriver: assistantDriver2._id,
            passengers: 26,
            ticketPrice: 150000,
            date: new Date('2024-09-14')
        },
        {
            bus: bus2._id,
            route: route2._id,
            driver: driver2._id,
            assistantDriver: assistantDriver2._id,
            passengers: 28,
            ticketPrice: 150000,
            date: new Date('2024-09-15')
        }
    ];

    await Trip.insertMany(trips);
    console.log('Trips seeded');
}
module.exports = seedTrips;