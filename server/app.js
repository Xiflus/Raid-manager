import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import session from "express-session";
import routes from "./src/routes/index.js";
import { PORT, UPLOADS_DIR, SECRET } from "./env.js";
import { errorController, notFoundController } from "./src/controllers/errors/index.js";

const app = express();

app.use(
	session({
		secret: SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	fileUpload({
		createParentPath: true,
		limits: {
			fileSize: 50 * 1024 * 1024,
		},
		abortOnlimit: true,
	})
);

app.use(express.static(UPLOADS_DIR));

app.use(cors());

app.use(morgan("dev"));

app.use(routes);

app.use(notFoundController);

app.use(errorController);

app.listen(PORT, () => {
	console.log(`server listening on http://localhost:${PORT}`);
});
