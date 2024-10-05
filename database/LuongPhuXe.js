var currentMonthStart = new Date();
currentMonthStart.setDate(1);
currentMonthStart.setHours(0, 0, 0, 0);

var currentMonthEnd = new Date(currentMonthStart);
currentMonthEnd.setMonth(currentMonthEnd.getMonth() + 1);

db.trips.aggregate([
    {
        $match: {
            date: { $gte: currentMonthStart, $lt: currentMonthEnd }
        }
    },
    {
        $lookup: {
            from: "drivers",
            localField: "assistantDriver",
            foreignField: "_id",
            as: "assistantDriverDetails"
        }
    },
    {
        $lookup: {
            from: "routes",
            localField: "route",
            foreignField: "_id",
            as: "routeDetails"
        }
    },
    {
        $project: {
            assistantDriverName: { $arrayElemAt: ["$assistantDriverDetails.name", 0] },
            complexity: { $arrayElemAt: ["$routeDetails.complexity", 0] }
        }
    },
    {
        $group: {
            _id: "$assistantDriverName",
            tripsCount: { $sum: 1 },
            complexitySum: { $sum: "$complexity" }
        }
    },
    {
        $project: {
            name: "$_id",
            salary: {
                $multiply: [
                    {
                        $add: [
                            { $multiply: ["$complexitySum", 200000] } // Lương cho phụ xe
                        ]
                    }
                ]
            }
        }
    }
]);
