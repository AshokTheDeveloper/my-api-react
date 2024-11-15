const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;

const initializeDBAndServer = async (app, PORT) => {
  try {
    await mongoose.connect(URI);
    console.log("DB connected successfully");
  } catch (error) {
    console.log("Database connection failed with error: ", error.message);
  }
  app.listen(PORT, () => {
    console.log(`Sever started and listens on http://localhost:${PORT}`);
  });
};

module.exports = initializeDBAndServer;
