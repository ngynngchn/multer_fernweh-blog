//package import
import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import { fileTypeFromBuffer } from "file-type";
import { body, validationResult } from "express-validator";
import data from "./blogEntries.json" assert { type: "json" };

//function import
import { addEntry, readFile } from "./utils/helper.js";

const server = express();

// Multer middleware for uploading images
const upload = multer({
	storage: multer.memoryStorage(), //Store the image data in memory
	limits: { fileSize: 20000000 }, //Limit the image file size to 20 MB
});

const PORT = 7777;

//Allow cross-origin requests from http://localhost:5173
server.use(cors({ origin: "http://localhost:5173" }));

//Log the requests and responses in the console
server.use(morgan("dev"));

//Serve the images folder at http://localhost:7777/images
server.use("/images", express.static("./images"));

// Handle post-requests to /api/addEntry
server.post(
	"/api/addEntry",
	upload.single("image"),
	body("title").isString(),
	body("content").isString(),
	(request, response) => {
		console.log(request.body);
		//checks if there are any validation errors in the request's body
		const errors = validationResult(request);
		// if there are validation errors, the server should return a 400 Bad Request response to the client indicatin that the request was invalid
		console.log(typeof request.body.title);
		console.log(typeof request.body.content);
		if (!errors.isEmpty()) {
			// send a JSON response to the client with an object containing an error property and an array of error messages returned by errors.array().
			// The error property is included to provide more context to the client about the type of error that occurred.
			return response.status(400).json({ error: errors.array() });
		}
		const data = request.body;

		console.log(data);

		// Read the entries from the file and assign an ID to the new entry
		fs.readFile("./blogEntries.json", (err, entries) => {
			if (err) console.log(err);
			else {
				data.id = JSON.parse(entries).length + 1;
			}
		});

		// Check the file type of the uploaded image
		fileTypeFromBuffer(request.file.buffer).then((result) => {
			if (
				result.ext === "jpg" ||
				result.ext === "png" ||
				result.ext === "jpeg"
			) {
				let filename = new Date().getTime();
				filename += "." + result.ext;
				// Write the image file to the images folder
				fs.writeFile("./images/" + filename, request.file.buffer, (err) => {
					if (err) console.log(err);
					else {
						data.image = filename;
						// Add the new entry to the blogEntries.json file
						addEntry(data)
							.then((newData) => response.json(newData))
							.catch((err) => console.log(err));
					}
				});
			} else {
				response.status(404).end(); // If the file type is not an image, send a 404 error response
			}
		});
	}
);

// Handle get request to api/blogEntries
server.get("/api/blogEntries", (request, response) => {
	readFile()
		.then((data) => response.json(data))
		.catch((err) => console.log(err));
});

server.delete("/api/blogEntries/:id", (request, response) => {
	const id = +request.params.id;
	const index = data.findIndex((object) => object.id === parseInt(id));
	// -1 means undefined when using findIndex()
	if (index !== -1) {
		data.splice(index, 1);
		fs.writeFile("./blogEntries.json", JSON.stringify(data, null, 2), (err) => {
			if (err) {
				response.status(500).send("Error writing to file");
			} else {
				fs.readFile("./blogEntries.json", (err, data) => {
					if (err) {
						response.status(500).send("Error reading file");
					} else {
						const updatedData = JSON.parse(data);
						response.send(updatedData);
					}
				});
			}
		});
	} else {
		response.status(404).send(`Object with id ${id} not found`);
	}
});

server.listen(PORT, () => console.log("I am listening to Port:", PORT)); //Start the server on port 7777 and log a message in the console
