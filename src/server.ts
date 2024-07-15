import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import corsOptions from './config/cors';
require("dotenv").config()
import userRouter from "./router/UserRouter"
import postRouter from "./router/PostRouter"
import commentRouter from './router/CommentRouter';
import categoryRouter from './router/CategoryRouter';
import pollRouter from './router/PollRouter';
import newsletterRouter from './router/NewsletterRouter';
import "reflect-metadata";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from "swagger-ui-express"
import feedsRouter from "./router/FeedRouter"

require("dotenv").config
const app = express();
const port = String(process.env.PORT) || 3030;

// Set up your routes and middleware here
app.use(cors({
  origin: "*"
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }))

// Run MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
const connection = mongoose.connection
connection.once('open', () => { console.log('Database running Successfully') });

app.use("/auth", userRouter)
app.use("/posts", postRouter)
app.use("/comments", commentRouter)
app.use("/categories", categoryRouter)
app.use("/polls", pollRouter)
app.use("/newsletter", newsletterRouter)
app.use("/feeds", feedsRouter)

//render the html fil
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Bettisports API",
      version: "0.1.0",
      description:
        "This is the docs for all APIs for Bettisports",
    },
    servers: [
      {
        url: "https://bettisports-backend.onrender.com",
      },
    ],
  },
  apis: ["./src/docs/*.ts"],
};

const specs = swaggerJSDoc(options);
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(specs, { explorer: true,
    customCssUrl:
    "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
  })
);

// Run Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});   