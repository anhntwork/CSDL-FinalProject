// Các hệ số độ khó
const difficultyCoefficients = {
    1: 1,
    2: 1.2,
    3: 1.5
};

// Ngày hiện tại
var today = new Date();

// Truy vấn để tính toán ngày bảo trì tiếp theo và xác định các xe quá hạn bảo dưỡng
db.buses.aggregate([
    {
        $lookup: {
            from: "trips",
            localField: "_id",
            foreignField: "bus",
            as: "tripsDetails"
        }
    },
    {
        $unwind: "$tripsDetails"
    },
    {
        $lookup: {
            from: "routes",
            localField: "tripsDetails.route",
            foreignField: "_id",
            as: "routeDetails"
        }
    },
    {
        $project: {
            licensePlate: 1,
            lastMaintenanceDate: 1,
            totalDistance: 1,
            tripDistance: {
                $multiply: [
                    "$tripsDetails.passengers",
                    {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$routeDetails.complexity", 1] }, then: difficultyCoefficients[1] },
                                { case: { $eq: ["$routeDetails.complexity", 2] }, then: difficultyCoefficients[2] },
                                { case: { $eq: ["$routeDetails.complexity", 3] }, then: difficultyCoefficients[3] }
                            ],
                            default: 1
                        }
                    }
                ]
            }
        }
    },
    {
        $group: {
            _id: "$_id",
            licensePlate: { $first: "$licensePlate" },
            lastMaintenanceDate: { $first: "$lastMaintenanceDate" },
            totalDistance: { $sum: "$tripDistance" }
        }
    },
    {
        $project: {
            licensePlate: 1,
            lastMaintenanceDate: 1,
            totalDistance: 1,
            // Số ngày bảo dưỡng giảm do tổng km đã đi
            daysSinceLastMaintenance: {
                $divide: [
                    { $subtract: [today, "$lastMaintenanceDate"] },
                    1000 * 60 * 60 * 24
                ]
            },
            // Số ngày bảo dưỡng đã giảm đi
            daysReduced: {
                $divide: [
                    { $divide: ["$totalDistance", 100] },
                    1
                ]
            },
            // Ngày bảo trì tiếp theo
            nextMaintenanceDate: {
                $add: [
                    "$lastMaintenanceDate",
                    { $multiply: [360, 24 * 60 * 60 * 1000] }
                ]
            }
        }
    },
    {
        $project: {
            licensePlate: 1,
            lastMaintenanceDate: 1,
            totalDistance: 1,
            daysReduced: 1,
            daysRemaining: {
                $subtract: [
                    360,
                    "$daysReduced"
                ]
            },
            nextMaintenanceDate: {
                $add: [
                    "$lastMaintenanceDate",
                    {
                        $multiply: [
                            {
                                $subtract: [360, "$daysReduced"]
                            },
                            24 * 60 * 60 * 1000
                        ]
                    }
                ]
            }
        }
    },
    {
        $match: {
            $expr: {
                $lt: [
                    "$nextMaintenanceDate",
                    today
                ]
            }
        }
    },
    {
        $project: {
            licensePlate: 1,
            nextMaintenanceDate: 1
        }
    }
]);
