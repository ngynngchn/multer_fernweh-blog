import fs from "fs";

// function to write an entry to the blogEntries.json file
export function writeEntry(data) {
	// returning a promise to handle asynchronous operation
	return new Promise((resolve, reject) => {
		fs.writeFile("./blogEntries.json", JSON.stringify(data, null, 2), (err) => {
			// if there's an error, reject the promise with the error object
			if (err) reject(err);
			// if successful, resolve the promise with a success message
			else {
				resolve("Writing blog entry was successful");
			}
		});
	});
}
export function writeDeletedEntries(data) {
	// returning a promise to handle asynchronous operation
	return new Promise((resolve, reject) => {
		fs.writeFile(
			"./deletedEntries.json",
			JSON.stringify(data, null, 2),
			(err) => {
				// if there's an error, reject the promise with the error object
				if (err) reject(err);
				// if successful, resolve the promise with a success message
				else {
					resolve("Writing blog entry was successful");
				}
			}
		);
	});
}

// function to read the blogEntries.json file
export function readFile() {
	// returning a promise to handle asynchronous operation
	return new Promise((resolve, reject) => {
		fs.readFile("./blogEntries.json", (err, data) => {
			// if there's an error, reject the promise with the error object
			if (err) reject(err);
			// if successful, resolve the promise with the parsed data
			else {
				resolve(JSON.parse(data));
			}
		});
	});
}

// function to add a new entry to the blogEntries.json file
export function addEntry(newEntry) {
	// returning a promise to handle asynchronous operation
	return new Promise((resolve, reject) => {
		// read the existing entries in the file
		readFile()
			// if successful, add the new entry to the existing entries and write the updated entries to the file
			.then((currentEntries) => {
				const updatedEntries = [...currentEntries, newEntry];
				writeEntry(updatedEntries)
					// if writing is successful, resolve the promise with the updated entries
					.then(() => resolve(updatedEntries))
					// if writing fails, reject the promise with the error object
					.catch((err) => reject(err));
			})
			// if reading fails, reject the promise with the error object
			.catch((err) => reject(err));
	});
}
