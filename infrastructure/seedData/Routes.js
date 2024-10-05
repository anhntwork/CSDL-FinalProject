const Route = require('../schema/routeSchema');

async function seedRoutes() {
    const routes = [
        {
          "startPoint": "Hà Nội",
          "endPoint": "Đà Nẵng",
          "distance": 780,
          "complexity": 2
        },
        {
          "startPoint": "Hồ Chí Minh",
          "endPoint": "Nha Trang",
          "distance": 450,
          "complexity": 1
        },
        {
          "startPoint": "Hải Phòng",
          "endPoint": "Nam Định",
          "distance": 120,
          "complexity": 3
        }
      ];

    await Route.insertMany(routes);
    console.log('Routes seeded');
}
module.exports = seedRoutes;

