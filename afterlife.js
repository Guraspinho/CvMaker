const express = require("express");
const connectDB = require("./db/mongo");
require("dotenv").config();
require("express-async-errors");


// import security packages
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const rateLimiter = require("express-rate-limit");
const cookieParser = require("cookie-parser");
// const csurf = require('csurf');

// import routes
const authRouter = require("./routes/auth");
const OauthRouter = require("./routes/Oauth");
const settingsRouter = require("./routes/settings");
const resumeRouter = require("./routes/resume");
const subscriptionRouter = require("./routes/subscription");
const homePage = require("./routes/homePage");

//middlewares
const notFound = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const authenticationMiddleware = require("./middlewares/authentication");


// import dev middleware
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(cookieParser());


// Security packages
app.set("trust proxy", 1);

app.use(
  rateLimiter(
    {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use(cors({
	origin: (origin, callback) =>
    {
    	callback(null, true);
    },
  	credentials: true,
  	methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
// app.use(csurf({cookie: true}));

// Middlewares
app.use(morgan("dev"));


// routes
app.use(homePage);
app.use("/auth", authRouter);
app.use("/oauth", OauthRouter);
app.use("/settings", authenticationMiddleware, settingsRouter);
app.use("/resumes",authenticationMiddleware, resumeRouter);
app.use("/subscription", authenticationMiddleware, subscriptionRouter);

// error middlewares
app.use(notFound);
app.use(errorHandlerMiddleware);

const prot = process.env.PORT || 5000;

const start = async () =>
{
    try
    {
        await connectDB(process.env.MONGO_URI);
        app.listen(prot, () => console.log(`server listening on port ${prot}...`));
    }
    catch (error)
    {
        console.log(error);
    }
};

start();

// before deployment
