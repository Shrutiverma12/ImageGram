import express from "express";
import connectDB from "./config/dbConfig.js";
import apiRouter from "./routers/apiRouter.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./utils/swaggerOptions.js";
import ip from "ip";

const PORT = 3000;

const app = express();

app.use(express.json()); //app.use helps us to register global middleware
app.use(express.text());
app.use(express.urlencoded());

// app.post("/hello", (req, res) => {
//   return res.json({ message: "Post Hello World" });
// });

// function m1(req, res, next) {
//   console.log("m1");
//   next();
// }

// app.use(m1);

// function m2(req, res, next) {
//   console.log("m2");
//   next();
// }

// function m3(req, res, next) {
//   console.log("m3");
//   next();
// }

// app.post("/posts", [m1, m2, m3], createPost);
//app.post("/posts", multerUploads, createPost);

//app.use("/posts", postRouter);
//app.use("/users", userRouter);

const swaggerDocs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
  //const name = req.params.name;
  //console.log(req.query);
  console.log(req.body);
  console.log(req.user);

  const ipaddr = ip.address();
  return res.json({ message: "pong" + ipaddr });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

//client ---> LB ---> server
