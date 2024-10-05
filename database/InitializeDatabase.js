/*
 Navicat Premium Data Transfer

 Source Server         : MongoDb-DockerDesktop-Localhost
 Source Server Type    : MongoDB
 Source Server Version : 70014 (7.0.14)
 Source Host           : localhost:27017
 Source Schema         : transportCompany

 Target Server Type    : MongoDB
 Target Server Version : 70014 (7.0.14)
 File Encoding         : 65001

 Date: 13/09/2024 05:40:29
*/


// ----------------------------
// Collection structure for buses
// ----------------------------
db.getCollection("buses").drop();
db.createCollection("buses");
db.getCollection("buses").createIndex({
    licensePlate: NumberInt("1")
}, {
    name: "licensePlate_1",
    background: true,
    unique: true
});

// ----------------------------
// Documents of buses
// ----------------------------
db.getCollection("buses").insert([ {
    _id: ObjectId("66e364433e653c54c3511997"),
    licensePlate: "29A-12345",
    color: "Red",
    manufacturer: "Toyota",
    modelYear: NumberInt("2019"),
    model: "Hiace",
    seats: NumberInt("30"),
    yearsInUse: NumberInt("4"),
    lastMaintenanceDate: ISODate("2024-01-15T00:00:00.000Z"),
    totalDistance: NumberInt("50000"),
    __v: NumberInt("0")
} ]);
db.getCollection("buses").insert([ {
    _id: ObjectId("66e364433e653c54c3511998"),
    licensePlate: "30B-67890",
    color: "Blue",
    manufacturer: "Ford",
    modelYear: NumberInt("2020"),
    model: "Transit",
    seats: NumberInt("28"),
    yearsInUse: NumberInt("3"),
    lastMaintenanceDate: ISODate("2024-05-10T00:00:00.000Z"),
    totalDistance: NumberInt("40000"),
    __v: NumberInt("0")
} ]);
db.getCollection("buses").insert([ {
    _id: ObjectId("66e364433e653c54c3511999"),
    licensePlate: "30B-67999",
    color: "Blue",
    manufacturer: "Ford",
    modelYear: NumberInt("2018"),
    model: "Transit",
    seats: NumberInt("28"),
    yearsInUse: NumberInt("3"),
    lastMaintenanceDate: ISODate("2023-05-10T00:00:00.000Z"),
    totalDistance: NumberInt("60000"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for drivers
// ----------------------------
db.getCollection("drivers").drop();
db.createCollection("drivers");

// ----------------------------
// Documents of drivers
// ----------------------------
db.getCollection("drivers").insert([ {
    _id: ObjectId("66e364433e653c54c351199c"),
    name: "Nguyễn Văn A",
    cmt: "123456789",
    licenseNumber: "AB123456",
    licenseType: "B2",
    address: "Hà Nội",
    dateOfBirth: ISODate("1980-04-20T00:00:00.000Z"),
    experienceYears: NumberInt("15"),
    __v: NumberInt("0")
} ]);
db.getCollection("drivers").insert([ {
    _id: ObjectId("66e364433e653c54c351199d"),
    name: "Trần Thị B",
    cmt: "987654321",
    licenseNumber: "CD987654",
    licenseType: "C",
    address: "Hải Phòng",
    dateOfBirth: ISODate("1990-06-15T00:00:00.000Z"),
    experienceYears: NumberInt("10"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for routes
// ----------------------------
db.getCollection("routes").drop();
db.createCollection("routes");

// ----------------------------
// Documents of routes
// ----------------------------
db.getCollection("routes").insert([ {
    _id: ObjectId("66e364433e653c54c351199f"),
    startPoint: "Hà Nội",
    endPoint: "Hải Phòng",
    distance: NumberInt("120"),
    complexity: NumberInt("1"),
    __v: NumberInt("0")
} ]);
db.getCollection("routes").insert([ {
    _id: ObjectId("66e364433e653c54c35119a0"),
    startPoint: "Hà Nội",
    endPoint: "Đà Nẵng",
    distance: NumberInt("760"),
    complexity: NumberInt("2"),
    __v: NumberInt("0")
} ]);
db.getCollection("routes").insert([ {
    _id: ObjectId("66e364433e653c54c35119a1"),
    startPoint: "Hà Nội",
    endPoint: "Sài Gòn",
    distance: NumberInt("1600"),
    complexity: NumberInt("3"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for trips
// ----------------------------
db.getCollection("trips").drop();
db.createCollection("trips");

// ----------------------------
// Documents of trips
// ----------------------------
db.getCollection("trips").insert([ {
    _id: ObjectId("66e364433e653c54c35119ab"),
    bus: ObjectId("66e364433e653c54c3511997"),
    route: ObjectId("66e364433e653c54c351199f"),
    driver: ObjectId("66e364433e653c54c351199c"),
    assistantDriver: ObjectId("66e364433e653c54c351199d"),
    passengers: NumberInt("28"),
    ticketPrice: NumberInt("150000"),
    date: ISODate("2024-09-12T00:00:00.000Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("trips").insert([ {
    _id: ObjectId("66e364433e653c54c35119ac"),
    bus: ObjectId("66e364433e653c54c3511997"),
    route: ObjectId("66e364433e653c54c351199f"),
    driver: ObjectId("66e364433e653c54c351199c"),
    assistantDriver: ObjectId("66e364433e653c54c351199d"),
    passengers: NumberInt("26"),
    ticketPrice: NumberInt("150000"),
    date: ISODate("2024-09-13T00:00:00.000Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("trips").insert([ {
    _id: ObjectId("66e364433e653c54c35119ad"),
    bus: ObjectId("66e364433e653c54c3511998"),
    route: ObjectId("66e364433e653c54c35119a1"),
    driver: ObjectId("66e364433e653c54c351199d"),
    assistantDriver: ObjectId("66e364433e653c54c351199c"),
    passengers: NumberInt("26"),
    ticketPrice: NumberInt("150000"),
    date: ISODate("2024-09-14T00:00:00.000Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("trips").insert([ {
    _id: ObjectId("66e364433e653c54c35119ae"),
    bus: ObjectId("66e364433e653c54c3511998"),
    route: ObjectId("66e364433e653c54c35119a1"),
    driver: ObjectId("66e364433e653c54c351199d"),
    assistantDriver: ObjectId("66e364433e653c54c351199c"),
    passengers: NumberInt("28"),
    ticketPrice: NumberInt("150000"),
    date: ISODate("2024-09-15T00:00:00.000Z"),
    __v: NumberInt("0")
} ]);
