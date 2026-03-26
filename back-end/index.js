require("dotenv").config();

let express = require("express");
let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

if (!JWT_SECRET) {
  console.error("FATAL: JWT_SECRET is not set in .env");
  process.exit(1);
}

// ─── JWT Middleware ────────────────────────────────────────────────────────────
// Attach this to any route you want to protect
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ message: "Access denied. No token." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
}

// ─── Demo: Login Route (issues a JWT) ─────────────────────────────────────────
// In real app, check username/password from DB here
app.post("/login", (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ message: "Username required" });

  // Create a token valid for 7 days
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

// ─── Demo: Protected Route ─────────────────────────────────────────────────────
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}! You accessed a protected route.` });
});

// let MongoURL = "mongodb://127.0.0.1:27017/OnLearny";

let MongoURL = process.env.MONGO_URI;

main()
  .then(console.log("connected to db"))
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MongoURL);
}

let commentSchema = mongoose.Schema({
  name: String,
  image: {
    type: String,
    default:
      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",

    set: (v) =>
      v === ""
        ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
        : v,
  },
  rating: Number,
  comment: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

let Feedback = mongoose.model("Feedback", commentSchema);

app.post("/feedback/new", async (req, res) => {
  try {
    let { name, image, rating, comment, date } = req.body;
    let newFeedback = new Feedback({ name, image, rating, comment, date });
    await newFeedback.save();
    if (req.headers["content-type"]?.includes("application/json")) {
      return res.status(201).json({ success: true });
    }
    res.redirect(`${FRONTEND_URL}/feedback`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save feedback" });
  }
});

app.get("/feedback", async (req, res) => {
  let data = await Feedback.find({});
  // console.log(data);
  res.send(data);
});

app.get("/feedback/:id", async (req, res) => {
  let { id } = req.params;
  let data = await Feedback.findById(id);
  if (!data) return res.status(404).json({ message: "Feedback not found" });
  res.json(data);
});

app.delete("/feedback/:id", async (req, res) => {
  let { id } = req.params;
  let data = await Feedback.findOneAndDelete({ _id: id });
  if (!data) return res.status(404).json({ message: "Feedback not found" });
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
