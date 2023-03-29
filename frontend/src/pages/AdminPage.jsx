import React from "react";
import { useState } from "react";

function AdminPage() {
	const [entries, setEntries] = useState();

	function handleSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);

		fetch("http://localhost:7777/api/addEntry", {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setEntries(data);
			});
	}

	return (
		<div className="AdminPage">
			<h3>Create a Blog Entry</h3>
			<form onSubmit={handleSubmit}>
				<input type="text" name="title" id="title" placeholder="Your title" />
				<select name="category" id="category">
					<option value="Travel">Travel</option>
					<option value="Food">Food</option>
				</select>
				<input type="file" name="image" id="image" />
				<textarea
					name="content"
					id="content"
					cols="30"
					rows="20"
					placeholder="Your text ..."></textarea>
				<button type="submit">Publish</button>
			</form>
		</div>
	);
}

export default AdminPage;
