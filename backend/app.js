const express = require('express');
const controller = require('./controller/controller')
const mongoose = require('mongoose')
require('dotenv').config();
const requestRouter = require('./router/route')
const cors = require("cors");

const app = express();

// Allow requests from your frontend
const allowedOrigins = [
  "http://localhost:5173",
  "https://sleekshort.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow non-browser requests like Postman

    // Allow listed origins or any Vercel preview deployment
    if (
      allowedOrigins.includes(origin) ||
      /\.vercel\.app$/.test(origin) // ✅ matches any vercel.app subdomain
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json())     //to get incoming json from react in req.body
app.use(controller.getReqInfo)
app.use(requestRouter)

const PORT = 7000


console.log("connecting...")
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ database connected!");

    app.listen(PORT, () => {
        console.log(`🚀 server running at http://localhost:${PORT}`);
    });
})
.catch((err) => {
console.error("❌ MongoDB connection error:", err);
});

module.exports = app;