const Bus = require('../schema/busSchema');

async function seedBuses() {
    const buses = [
        {
            "licensePlate": "29A-12345",
            "color": "Đỏ",
            "manufacturer": "Hãng A",
            "modelYear": 2020,
            "model": "Model X",
            "seats": 45,
            "yearsInUse": 3,
            "lastMaintenanceDate": "2024-01-07",
            "totalDistance": 50000
        },
        {
            "licensePlate": "30B-67890",
            "color": "Xanh",
            "manufacturer": "Hãng B",
            "modelYear": 2018,
            "model": "Model Y",
            "seats": 40,
            "yearsInUse": 5,
            "lastMaintenanceDate": "2024-03-02",
            "totalDistance": 75000
        },
        {
            "licensePlate": "30B-67999",
            "color": "Vàng",
            "manufacturer": "Hãng C",
            "modelYear": 2015,
            "model": "Model Z",
            "seats": 35,
            "yearsInUse": 8,
            "lastMaintenanceDate": "2024-05-04",
            "totalDistance": 120000
        }
    ];

    await Bus.insertMany(buses);
    console.log('Buses seeded');
}
module.exports = seedBuses;