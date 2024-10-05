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
                    { $arrayElemAt: ["$routeDetails.complexity", 0] } // Hệ số độ khó
                ]
            }
        }
    },
    {
        $group: {
            _id: "$_id",
            totalDistance: { $sum: "$tripDistance" },
            lastMaintenanceDate: { $first: "$lastMaintenanceDate" }
        }
    },
    {
        $project: {
            licensePlate: "$_id",
            totalDistance: 1,
            lastMaintenanceDate: 1,
            daysSinceLastMaintenance: {
                $divide: [
                    { $subtract: [new Date(), "$lastMaintenanceDate"] },
                    1000 * 60 * 60 * 24
                ]
            },
            daysToNextMaintenance: {
                $subtract: [
                    360,
                    {
                        $divide: [
                            { $sum: [{ $divide: ["$totalDistance", 100] }] }, // Giảm theo số km
                            100
                        ]
                    }
                ]
            },
            nextMaintenanceDate: {
                $add: [
                    "$lastMaintenanceDate",
                    { $multiply: [360, 24 * 60 * 60 * 1000] } // Thêm 360 ngày
                ]
            }
        }
    }
]);
