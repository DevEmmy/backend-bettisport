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
import "reflect-metadata";

const app = express();
const port = String(process.env.PORT) || 3030;

// Set up your routes and middleware here
app.use(cors({
  origin: "*"
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }))

// Run MongoDB
mongoose.connect(process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/backend-bettisport`)
const connection = mongoose.connection
connection.once('open', () => { console.log('Database running Successfully') });

app.use("/auth", userRouter)
app.use("/posts", postRouter)
app.use("/comment", commentRouter)
app.use("/category", categoryRouter)
app.use("/poll", pollRouter)

//render the html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Run Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});   