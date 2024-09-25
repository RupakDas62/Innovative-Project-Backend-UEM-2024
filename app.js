const express = require('express');
const cors = require('cors');
const multer = require('multer'); // Assuming you're using multer for file uploads
const fireReportRoute = require('./routes/fireReportRoute'); // Adjust the path as needed
const createOfficeRoute = require('./routes/createOfficeRoute');

const mongoose = require('mongoose');

const app = express();

const mongodbURI = process.env.MONGO_URI;

// Middleware
const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Enable credentials (if needed)
  };
  
  app.use(cors(corsOptions)); // Use customized CORS options

app.use(express.json()); // For parsing application/json

// console.log(mongodbURI);

mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`DB connected to Innovation-Project ${mongodbURI}`);
}).catch((err) => {
  console.log("Error Occurred while Connecting to DB", err);
});



// Routes
app.use('/api', fireReportRoute);
app.use('/create-fire-office', createOfficeRoute);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


  