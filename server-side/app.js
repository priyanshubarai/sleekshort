const express = require('express');
const controller = require('./controller/controller')
const mongoose = require('mongoose')
require('dotenv').config();
const requestRouter = require('./router/route')

const app = express();

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