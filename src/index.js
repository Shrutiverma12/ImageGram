import express from "express";
import connectDB from "./config/dbConfig.js";
import { createPost } from "./controllers/postController.js";
import { multerUploads } from "./config/multerConfig.js";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

// function m1(req, res, next) {
//   console.log("m1");
//   next();
// }

// app.use(m1);

app.get("/ping", (req, res) => {
  //const name = req.params.name;
  //console.log(req.query);
  console.log(req.body);
  return res.json({ message: "pong " });
});

// app.post("/hello", (req, res) => {
//   return res.json({ message: "Post Hello World" });
// });

// function m1(req, res, next) {
//   console.log("m1");
//   next();
// }

// function m2(req, res, next) {
//   console.log("m2");
//   next();
// }

// function m3(req, res, next) {
//   console.log("m3");
//   next();
// }

// app.post("/posts", [m1, m2, m3], createPost);
app.post("/posts", multerUploads, createPost);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
