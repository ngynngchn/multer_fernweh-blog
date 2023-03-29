//package import
import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import { fileTypeFromBuffer } from "file-type";

//function import
import { addEntry, readFile } from "./utils/helper.js";

const server = express();

const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 20000000 },
});

const PORT = 7777;
server.use(cors({ origin: "http://localhost:5173" }));
server.use(morgan("dev"));

server.use("/images", express.static("./images"));

// Handle post-requests to /api/addEntry
server.post("/api/addEntry", upload.single("image"), (request, response) => {
	const data = request.body;

	console.log(data);

	fs.readFile("./blogEntries.json", (err, entries) => {
		if (err) console.log(err);
		else {
			console.log("id", JSON.parse(entries).length);
			data.id = JSON.parse(entries).length + 1;
		}
	});

	fileTypeFromBuffer(request.file.buffer).then((result) => {
		if (result.ext === "jpg" || result.ext === "png" || result.ext === "jpeg") {
			let filename = new Date().getTime();
			filename += "." + result.ext;
			fs.writeFile("./images/" + filename, request.file.buffer, (err) => {
				if (err) console.log(err);
				else {
					data.image = filename;
					addEntry(data)
						.then((newData) => response.json(newData))
						.catch((err) => console.log(err));
				}
			});
		} else {
			response.status(404).end();
		}
	});
});
// Handle get request to api/blogEntries
server.get("/api/blogEntries", (request, response) => {
	readFile()
		.then((data) => response.json(data))
		.catch((err) => console.log(err));
});

server.listen(PORT, () => console.log("I am listening to Port:", PORT));
