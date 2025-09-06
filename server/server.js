import { config } from "dotenv";
config();
import app from "./app.js";
import connectToDB from "./config/db.connection.js";

const PORT = process.env.PORT || 8000;
connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅️ Server is running at ${PORT}`);
    });
  })

  .catch((e) => {
    console.log("❌ MongoDB connection failed!!!");
    console.log(e);
  });
