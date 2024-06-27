import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./src/routes/index.js";
import { PORT } from "./env.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.use(routes);

app.listen(PORT, () => {
	console.log(`server listening on http://localhost:${PORT}`);
});
