import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import router from "./router/index";
import bodyParser from 'body-parser'

dotenv.config()
const server = express();
const databaseURI = String(process.env.mongodbURI);
const port = process.env.PORT;

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(router);

mongoose
  .connect(databaseURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log("MongoDB connected")
    return server.listen(port)
  })
  .then(() => {
    console.log(`Server listening at http://localhost:${port}`)
  })
  .catch((err) => {
    console.log(err)
  })

