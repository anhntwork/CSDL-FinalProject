// Thay đổi ngày bắt đầu và ngày kết thúc theo yêu cầu
var startDate = ISODate("2024-01-01T00:00:00.000Z");
var endDate = ISODate("2024-12-31T23:59:59.000Z");

db.trips.aggregate([
    {
        $match: {
            date: { $gte: startDate, $lt: endDate }
        }
    },
    {
        $lookup: {
            from: "buses",
            localField: "bus",
            foreignField: "_id",
            as: "busDetails"
        }
    },
    {
        $project: {
            busId: { $arrayElemAt: ["$busDetails._id", 0] },
            passengers: 1,
            ticketPrice: 1
        }
    },
    {
        $group: {
            _id: "$busId",
            totalRevenue: {
                $sum: { $multiply: ["$passengers", "$ticketPrice"] }
            }
        }
    },
    {
        $lookup: {
            from: "buses",
            localField: "_id",
            foreignField: "_id",
            as: "busDetails"
        }
    },
    {
        $project: {
            busId: "$_id",
            totalRevenue: 1,
            licensePlate: { $arrayElemAt: ["$busDetails.licensePlate", 0] }
        }
    }
]);
