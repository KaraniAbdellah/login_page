import express from "express";
import 'dotenv/config'
import router from "./routes/route.js";
import mongoose from "mongoose";
import cors from "cors";


const app = express();
app.use(cors())
app.use(express.json());
app.use(router);





mongoose.connect(process.env.DB_URL).then(() => {
    console.log("✅ Connect Succefully to Database");
}).catch((err) => {
    console.log("❌ Connect to Database Failed");
});


app.listen(process.env.PORT, function (err) {
    if (err) console.log(err);
    console.log("✅ Server listening on PORT", process.env.PORT);
});



