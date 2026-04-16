const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const gradeRoutes = require("./routes/gradeRoutes");
const admissionRoutes = require("./routes/admissionRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const tutorRoutes = require("./routes/tutorRoutes");
const progressRoutes = require("./routes/progressRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const noteRoutes = require("./routes/noteRoutes");
const cartRoutes = require("./routes/cartRoutes");
const AppError = require("./utils/appError");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
const configuredOrigins = (process.env.CORS_ORIGIN || "*")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowAllOrigins = configuredOrigins.includes("*");
const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowAllOrigins || configuredOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new AppError(`CORS blocked for origin: ${origin}`, 403));
  },
  credentials: !allowAllOrigins
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.status(200).json({ status: "success", message: "LuminEd API healthy" }));


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/tutors", tutorRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/cart", cartRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
