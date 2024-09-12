const mongoose = require('mongoose');
const { calculateDriverSalary, calculateRevenue, checkBusMaintenance } = require('./functions'); // Import các hàm từ file khác nếu bạn tách ra

const { connectionString } = require('./appConfig')

mongoose.connect(connectionString)
  .then(() => {
    console.log('Connected to MongoDB');
    runFunctions();
  })
  .catch(err => console.error('Error connecting to MongoDB', err));

async function runFunctions() {
  try {
    console.log("\n-----------------Yêu cầu 1: ------------------\n")
    await calculateDriverSalary();

    console.log("\n-----------------Yêu cầu 2: ------------------\n")
    await calculateRevenue('2024-09-01', '2024-09-30');

    console.log("\n-----------------Yêu cầu 3: ------------------\n")
    await checkBusMaintenance();
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
}
