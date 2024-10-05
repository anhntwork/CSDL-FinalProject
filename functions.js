const Route = require("./infrastructure/schema/routeSchema")
const Trip = require("./infrastructure/schema/tripSchema")
const Bus = require("./infrastructure/schema/busSchema")
const Driver = require("./infrastructure/schema/driverSchema")

const calculateDriverSalary = async () => {
    const salaryFactors = require('./infrastructure/constants/salaryFactors')

    const calculateSalary = async (driverId, month, year) => {
        const trips = await Trip.find({
            $or: [{ driver: driverId }, { assistantDriver: driverId }],
            date: {
                $gte: new Date(year, month - 1, 1),
                $lt: new Date(year, month, 1)
            }
        }).populate('route');

        let totalSalary = 0;

        trips.forEach(trip => {
            const routeComplexity = trip.route.complexity;
            const tripSalary = salaryFactors[routeComplexity] || 0;

            if (trip.driver.equals(driverId)) {
                // Lái xe có lương gấp đôi
                totalSalary += tripSalary * 2;
            } else if (trip.assistantDriver.equals(driverId)) {
                // Phụ xe có lương bình thường
                totalSalary += tripSalary;
            }
        });

        return totalSalary;
    };


    try {
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();

        const drivers = await Driver.find();
        const salaries = [];

        for (const driver of drivers) {
            const salary = await calculateSalary(driver._id, month, year);
            salaries.push({
                name: driver.name,
                salary: salary
            });
        }

        console.log('Lương của tài xế, phụ xe cho tháng hiện tại:');
        salaries.forEach(s => console.log(`Tên: ${s.name}, Lương: ${s.salary}`));

    } catch (err) {
        console.error('Error:', err);
    }
};

const calculateRevenue = async (startDate, endDate) => {
    try {
        const trips = await Trip.find({
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).populate('bus');

        // Tính doanh thu cho từng xe
        const revenueMap = new Map();

        trips.forEach(trip => {
            const bus = trip.bus;
            const revenue = trip.passengers * trip.ticketPrice;

            if (revenueMap.has(bus.licensePlate)) {
                revenueMap.set(bus.licensePlate, revenueMap.get(bus.licensePlate) + revenue);
            } else {
                revenueMap.set(bus.licensePlate, revenue);
            }
        });

        console.log('Doanh thu từ', startDate, 'đến', endDate);
        revenueMap.forEach((revenue, licensePlate) => {
            console.log(`BKS: ${licensePlate}, Doanh thu: ${revenue}`);
        });

    } catch (err) {
        console.error('Error:', err);
    }
};

const checkBusMaintenance = async () => {
    const difficultyFactors = require("./infrastructure/constants/difficultyFactors")
    const calculateNextMaintenanceDate = async (bus) => {
        const trips = await Trip.find({ bus: bus._id }).populate('route');

        let totalDistance = 0;

        trips.forEach(trip => {
            const difficultyFactor = difficultyFactors[trip.route.complexity] || 1;
            totalDistance += (trip.route.distance ?? 0) * difficultyFactor;
        });

        const daysPer100km = 1;
        const distanceFactor = Math.floor(totalDistance / 100);
        const maintenanceInterval = 360 - distanceFactor;

        const lastMaintenanceDate = new Date(bus.lastMaintenanceDate);
        const nextMaintenanceDate = new Date(lastMaintenanceDate);
        nextMaintenanceDate.setDate(lastMaintenanceDate.getDate() + maintenanceInterval);

        return nextMaintenanceDate;
    };
    const buses = await Bus.find(); // Lấy tất cả các xe
    const maintenanceDetails = {
        dueSoon: [],
        overdue: []
    };

    for (const bus of buses) {
        const nextMaintenanceDate = await calculateNextMaintenanceDate(bus);
        const today = new Date();

        if (nextMaintenanceDate < today) {
            maintenanceDetails.overdue.push({
                licensePlate: bus.licensePlate,
                nextMaintenanceDate
            });
        } else {
            maintenanceDetails.dueSoon.push({
                licensePlate: bus.licensePlate,
                nextMaintenanceDate
            });
        }
    }

    console.log('Xe bảo dưỡng sắp tới:');
    maintenanceDetails.dueSoon.forEach(s => {
        console.log("BKS:", s.licensePlate, "; Ngày bảo dưỡng sắp tới", s.nextMaintenanceDate)
    })
    console.log('Xe quá hạn bảo dưỡng:');
    maintenanceDetails.overdue.forEach(s => {
        console.log("BKS:", s.licensePlate, "; Ngày bảo dưỡng kế tiếp", s.nextMaintenanceDate)
    })
};


module.exports = { calculateDriverSalary, calculateRevenue, checkBusMaintenance }