const Driver = require('../schema/driverSchema');

async function seedDrivers() {
    const drivers = [
        {
          "name": "Nguyễn Văn A",
          "cmt": "123456789",
          "licenseNumber": "DL123456",
          "licenseType": "B2",
          "address": "Hà Nội",
          "dateOfBirth": "1985-05-15",
          "experienceYears": 10
        },
        {
          "name": "Trần Thị B",
          "cmt": "987654321",
          "licenseNumber": "DL987654",
          "licenseType": "D",
          "address": "Hà Nội",
          "dateOfBirth": "1990-03-20",
          "experienceYears": 5
        },
        {
          "name": "Lê Văn C",
          "cmt": "456123789",
          "licenseNumber": "DL456123",
          "licenseType": "B2",
          "address": "Hà Nội",
          "dateOfBirth": "1980-08-30",
          "experienceYears": 15
        }
      ];

    await Driver.insertMany(drivers);
    console.log('Drivers seeded');
}
module.exports = seedDrivers;
