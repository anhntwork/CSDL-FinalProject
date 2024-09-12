const Route = require('../schema/routeSchema');

async function seedRoutes() {
    const routes = [
        {
            startPoint: 'Hà Nội',
            endPoint: 'Hải Phòng',
            distance: 120, // km
            complexity: 1
        },
        {
            startPoint: 'Hà Nội',
            endPoint: 'Đà Nẵng',
            distance: 760, // km
            complexity: 2
        },
        {
            startPoint: 'Hà Nội',
            endPoint: 'Sài Gòn',
            distance: 1600, // km
            complexity: 3
        }
    ];

    await Route.insertMany(routes);
    console.log('Routes seeded');
}
module.exports = seedRoutes;

