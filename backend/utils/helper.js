import fs from "fs";

// function to write a file
export function writeEntry(data) {
	return new Promise((resolve, reject) => {
		fs.writeFile("./blogEntries.json", JSON.stringify(data, null, 2), (err) => {
			if (err) reject(err);
			else {
				resolve("Writing blog entry was successful");
			}
		});
	});
}

export function readFile() {
	return new Promise((resolve, reject) => {
		fs.readFile("./blogEntries.json", (err, data) => {
			if (err) reject(err);
			else {
				resolve(JSON.parse(data));
			}
		});
	});
}

export function addEntry(newEntry) {
	return new Promise((resolve, reject) => {
		readFile()
			.then((currentEntries) => {
				const updatedEntries = [...currentEntries, newEntry];
				writeEntry(updatedEntries)
					.then((response) => resolve(updatedEntries))
					.catch((err) => reject(err));
			})
			.catch((err) => reject(err));
	});
}
