const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require('cors')
const cookieParser = require('cookie-parser')
require("dotenv").config();
const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGOURL

// create out express app
const app = express()

// Handle CORS + middleware
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// database stuff
mongoose.set("strictQuery", false);
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
})
.then(() => {
  console.log("MongoDB connected")
  // start server
  app.listen(port, () => {
    console.log("Listening at port 5000")
  })
})
.catch(err => console.log(err));

app.use(bodyParser.json({ limit: '500mb', extended: true }));
app.use(express.json());
// app.use(cors({
//   credentials: true,
//   exposedHeaders: ["set-cookie"],
//   origin: ['http://localhost:3000'],
//   preflightContinue: false,
//   optionsSuccessStatus: 204
// }))
app.use(cors());


app.use(cookieParser());

// routes
app.get("/", (res, req) => {
  res.send("yay home page")
})

app.use('/api/auth', require('./routes/auth'));
app.use('/api/employer', require('./routes/jobs'));
app.use('/api/employer', require('./routes/employer'));
app.use('/api/proposals', require('./routes/proposals'));
app.use('/api/freelancer', require('./routes/freelancer'));


// const routes = require('./routes/allRoutes');
//   app.use('/api', routes)