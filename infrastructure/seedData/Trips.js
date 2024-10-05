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

    const bus3 = await Bus.findOne({ licensePlate: '30B-67999' });
    const driver3 = await Driver.findOne({ name: 'Lê Văn C' });
    const assistantDriver3 = await Driver.findOne({ name: 'Nguyễn Văn A' });

    const route1 = await Route.findOne({ startPoint: 'Hà Nội', endPoint: 'Đà Nẵng' });
    const route2 = await Route.findOne({ startPoint: 'Hồ Chí Minh', endPoint: 'Nha Trang' });
    const route3 = await Route.findOne({ startPoint: 'Hải Phòng', endPoint: 'Nam Định' });

    const trips = [
        {
            "bus": bus1.id,
            "route": route1.id,
            "driver": driver1.id,
            "assistantDriver": assistantDriver1.id,
            "passengers": 40,
            "ticketPrice": 150000,
            "date": "2024-09-05"
        },
        {
            "bus": bus2.id,
            "route": route2.id,
            "driver": driver2.id,
            "assistantDriver": assistantDriver2.id,
            "passengers": 30,
            "ticketPrice": 200000,
            "date": "2024-09-12"
        },
        {
            "bus": bus3.id,
            "route": route3.id,
            "driver": driver3.id,
            "assistantDriver": assistantDriver3.id,
            "passengers": 25,
            "ticketPrice": 80000,
            "date": "2024-09-15"
        }
    ];

    await Trip.insertMany(trips);
    console.log('Trips seeded');
}
module.exports = seedTrips;