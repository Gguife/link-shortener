import express from "express";
import dotenv from "dotenv";
import sequelizeConn from "./config/conn.js";
import urlRoutes from "./controller/url.js";
import clickRoutes from "./controller/click.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.get("/api", (_req, res) => res.json({ message: "© 2024 - gguife shortened links!" }));

app.use('/', urlRoutes);
app.use('/click', [clickRoutes]);

sequelizeConn.authenticate().then(() => {
  console.log(`Database is connected: ${process.env.DB_NAME}`);
}).catch(error => console.error('Unable to connect to the database:', error));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})