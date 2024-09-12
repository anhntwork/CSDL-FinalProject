const Driver = require('../schema/driverSchema');

async function seedDrivers() {
    const drivers = [
        {
            name: 'Nguyễn Văn A',
            cmt: '123456789',
            licenseNumber: 'AB123456',
            licenseType: 'B2',
            address: 'Hà Nội',
            dateOfBirth: new Date('1980-04-20'),
            experienceYears: 15
        },
        {
            name: 'Trần Thị B',
            cmt: '987654321',
            licenseNumber: 'CD987654',
            licenseType: 'C',
            address: 'Hải Phòng',
            dateOfBirth: new Date('1990-06-15'),
            experienceYears: 10
        }
    ];

    await Driver.insertMany(drivers);
    console.log('Drivers seeded');
}
module.exports = seedDrivers;
